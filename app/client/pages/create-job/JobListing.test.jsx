import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobListing from './JobListing';

// Mock Firebase related imports
jest.mock('../../firebase/FirebaseService', () => ({
  saveJobListing: jest.fn(),
  saveMentorListing: jest.fn()
}));

describe('JobListing Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <JobListing />
      </BrowserRouter>
    );
  });
});