import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils';
import Mentors from './Mentors';

// Mock the entire firebase modules
jest.mock('../../firebase/firebaseClient', () => ({
  database: {},
  auth: {}
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  push: jest.fn(),
  get: jest.fn(),
  getDatabase: jest.fn()
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

describe('Mentors Component', () => {
  const mockUser = {
    uid: 'testuid123',
    email: 'test@example.com'
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock auth state
    const { getAuth, onAuthStateChanged } = require('firebase/auth');
    getAuth.mockReturnValue({});
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock database responses
    const { ref, get } = require('firebase/database');
    ref.mockReturnValue({});
    get.mockResolvedValue({
      exists: () => true,
      val: () => ({
        mentor1: {
          mentorName: 'John Doe',
          expertise: 'JavaScript',
          description: 'Senior developer with 10 years experience',
          createdAt: '2024-01-01T00:00:00.000Z',
          userId: 'user123',
          userEmail: 'john@example.com'
        }
      })
    });
  });

  it('should render mentor registration form when user is logged in', async () => {
    renderWithRouter(<Mentors />);

    await waitFor(() => {
      expect(screen.getByText('Register as a Mentor')).toBeInTheDocument();
      expect(screen.getByLabelText('Name:')).toBeInTheDocument();
      expect(screen.getByLabelText('Expertise:')).toBeInTheDocument();
      expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    });
  });

  it('should display login message when user is not authenticated', async () => {
    const { onAuthStateChanged } = require('firebase/auth');
    // Mock user as not authenticated
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });

    renderWithRouter(<Mentors />);

    await waitFor(() => {
      expect(screen.getByText('Please Log In')).toBeInTheDocument();
      expect(screen.getByText('You must be logged in to view and request mentors.')).toBeInTheDocument();
    });
  });

  it('should successfully save a new mentor', async () => {
    const { push } = require('firebase/database');
    push.mockResolvedValueOnce();

    renderWithRouter(<Mentors />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Name:'), {
        target: { value: 'Jane Smith' }
      });
      fireEvent.change(screen.getByLabelText('Expertise:'), {
        target: { value: 'React Development' }
      });
      fireEvent.change(screen.getByLabelText('Description:'), {
        target: { value: 'Frontend expert with React experience' }
      });
    });

    fireEvent.click(screen.getByText('Register as Mentor'));

    await waitFor(() => {
      expect(screen.getByText('Mentor profile "Jane Smith" saved successfully.')).toBeInTheDocument();
    });
  });

  it('should display error when saving mentor fails', async () => {
    const { push } = require('firebase/database');
    push.mockRejectedValueOnce(new Error('Database error'));

    renderWithRouter(<Mentors />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Name:'), {
        target: { value: 'Jane Smith' }
      });
      fireEvent.change(screen.getByLabelText('Expertise:'), {
        target: { value: 'React Development' }
      });
      fireEvent.change(screen.getByLabelText('Description:'), {
        target: { value: 'Frontend expert with React experience' }
      });
    });

    fireEvent.click(screen.getByText('Register as Mentor'));

    await waitFor(() => {
      expect(screen.getByText('Error saving mentor profile: Database error')).toBeInTheDocument();
    });
  });

  it('should display existing mentors', async () => {
    renderWithRouter(<Mentors />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Senior developer with 10 years experience')).toBeInTheDocument();
    });
  });

  it('should validate required fields', async () => {
    renderWithRouter(<Mentors />);

    fireEvent.click(screen.getByText('Register as Mentor'));

    await waitFor(() => {
      expect(screen.getByText('All fields are required.')).toBeInTheDocument();
    });
  });
});