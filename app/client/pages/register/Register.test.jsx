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
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: {}
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'Test' }
    });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'User' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter a password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Continue'));

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

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'Test' }
    });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'User' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter a password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    });
  });
});