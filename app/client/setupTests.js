console.log('setupTests.js is being loaded!');

import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: '123',
      email: 'test@example.com',
      getIdToken: jest.fn().mockResolvedValue('fake-token')
    }
  })),
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

// Mock Firebase database
jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  push: jest.fn().mockResolvedValue({ key: 'fake-key' }),
  get: jest.fn(),
  getDatabase: jest.fn()
}));

// Mock FirebaseService
jest.mock('./firebase/FirebaseService', () => ({
  __esModule: true,
  default: {
    auth: {
      currentUser: {
        uid: '123',
        email: 'test@example.com',
        getIdToken: jest.fn().mockResolvedValue('fake-token')
      }
    },
    database: {},
    getCurrentUser: jest.fn(() => ({
      uid: '123',
      email: 'test@example.com',
      getIdToken: jest.fn().mockResolvedValue('fake-token')
    })),
    saveJobListing: jest.fn().mockResolvedValue('fake-job-id'),
    getJobListings: jest.fn().mockResolvedValue([])
  }
}));