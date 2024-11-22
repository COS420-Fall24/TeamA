import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { renderWithRouter } from '../../test-utils';
import { FirebaseService } from '../../firebase/FirebaseService';

describe('Register Component', () => {
  it('should display success message on successful registration', async () => {
    jest.spyOn(FirebaseService, 'registerWithEmailAndPassword').mockResolvedValueOnce();
    
    renderWithRouter(<Register />);

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
    jest.spyOn(FirebaseService, 'registerWithEmailAndPassword').mockRejectedValueOnce(new Error('Registration failed. Please try again.'));
    
    renderWithRouter(<Register />);

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