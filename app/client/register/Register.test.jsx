import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from './Register';

describe('Register Component', () => {
  it('should display error message on failed registration', async () => {
    // Mock the fetch function to simulate a failed registration
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Registration failed. Please try again.' }),
      })
    );

    render(<Register />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Check for the error message
    const errorMessage = await screen.findByText('Registration failed. Please try again.');
    expect(errorMessage).toBeInTheDocument();

    // Clean up the mock
    global.fetch.mockClear();
  });

  it('should display success message on successful registration', async () => {
    // Mock the fetch function to simulate a successful registration
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Registration successful!' }),
      })
    );

    render(<Register />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Check for the success message
    const successMessage = await screen.findByText('Registration successful!');
    expect(successMessage).toBeInTheDocument();

    // Clean up the mock
    global.fetch.mockClear();
  });
});