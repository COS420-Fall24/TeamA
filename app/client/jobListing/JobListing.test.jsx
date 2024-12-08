import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobListing from './JobListing';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, push, get } from 'firebase/database';

// Mock Firebase modules
jest.mock('firebase/auth');
jest.mock('firebase/database');
jest.mock('../firebase/firebaseClient', () => ({
  database: {},
  auth: {}
}));

describe('JobListing Component', () => {
  beforeEach(() => {
    // Mock authenticated user
    getAuth.mockReturnValue({});
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ uid: '123', email: 'test@example.com' });
      return jest.fn();
    });

    // Mock database response
    ref.mockReturnValue({});
    push.mockResolvedValue({});
    get.mockResolvedValue({ exists: () => false, val: () => null });
  });

  it('should show error message when submitting empty form', () => {
    render(<JobListing />);

    fireEvent.click(screen.getByRole('button', { name: /save job/i }));

    expect(screen.getByText(/both job name and description are required/i)).toBeInTheDocument();
  });

  it('should display login message when user is not authenticated', () => {
    // Mock user as not authenticated
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });

    render(<JobListing />);

    expect(screen.getByText(/please log in/i)).toBeInTheDocument();
    expect(screen.getByText(/you must be logged in to post and view jobs/i)).toBeInTheDocument();
  });
});