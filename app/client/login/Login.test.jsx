import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import Login from './Login';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn()
}));

jest.mock('../firebase/firebaseClient', () => ({
  auth: {}
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('should handle successful login', async () => {
    // Mock successful Firebase login
    const { signInWithEmailAndPassword } = require('firebase/auth');
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        getIdToken: () => Promise.resolve('fake-token')
      }
    });

    // Mock successful API response
    global.fetch.mockResolvedValueOnce({
      ok: true
    });

    render(<Login />);

    // Fill in form
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });

    // Submit form
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { type: 'submit' }));
    });

    // Check success message
    expect(screen.getByText('Login successful!')).toBeInTheDocument();
  });

  it('should handle login failure', async () => {
    // Mock Firebase login failure
    const { signInWithEmailAndPassword } = require('firebase/auth');
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<Login />);

    // Fill in form
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrong-password' }
    });

    // Submit form
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { type: 'submit' }));
    });

    // Check error message
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});