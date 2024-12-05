import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { renderWithRouter } from '../../test-utils';
import { FirebaseService } from '../../firebase/FirebaseService';

describe('Login Component', () => {
  it('should display success message on successful login', async () => {
    jest.spyOn(FirebaseService, 'loginWithEmailAndPassword').mockResolvedValueOnce();

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText('Login successful!')).toBeInTheDocument();
    });
  });

  it('should display error message on failed login', async () => {
    jest.spyOn(FirebaseService, 'loginWithEmailAndPassword').mockRejectedValueOnce(new Error('Login failed. Please try again.'));
    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrong-password' }
    });

    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument();
    });
  });
});