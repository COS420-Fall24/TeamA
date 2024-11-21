import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Register from './Register';
import { MemoryRouter } from 'react-router-dom';

// Mock the Firebase functions
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  getAuth: jest.fn(() => ({
  
  })),
}));

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display success message on successful registration', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );


    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'Test' }
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'User' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password', { selector: 'input#password' }), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByLabelText('Confirm Password', { selector: 'input#confirmPassword' }), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    });
  });

  it('should display error message on failed registration', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Registration failed. Please try again.'));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'Test' }
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'User' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password', { selector: 'input#password' }), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByLabelText('Confirm Password', { selector: 'input#confirmPassword' }), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    });
  });
});