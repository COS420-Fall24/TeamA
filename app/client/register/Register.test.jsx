import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Register from './Register';

// Mock the Firebase functions
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({

  })),
}));

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display success message on successful registration', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({});

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/registration successful!/i)).toBeInTheDocument();
    });
  });

  it('should display error message on failed registration', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Registration failed'));

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
    });
  });
});