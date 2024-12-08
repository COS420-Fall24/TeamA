import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import CreateListing from './CreateListing';
import { renderWithRouter } from '../../test-utils';
import { FirebaseService } from '../../firebase/FirebaseService';

describe('CreateListing Component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<CreateListing />);
    expect(screen.getByText('Create New Listing')).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    jest.spyOn(FirebaseService, 'saveListing').mockResolvedValueOnce({ id: 'test-id' });
    
    renderWithRouter(<CreateListing />);

    fireEvent.change(screen.getByLabelText(/job title:/i), {
      target: { value: 'Test Job' }
    });
    fireEvent.change(screen.getByLabelText(/description:/i), {
      target: { value: 'Test Description' }
    });

    fireEvent.click(screen.getByText(/save job listing/i));

    await waitFor(() => {
      expect(FirebaseService.saveListing).toHaveBeenCalledWith('job', {
        name: 'Test Job',
        description: 'Test Description'
      });
    });
  });

  it('should display success message on successful save', async () => {
    jest.spyOn(FirebaseService, 'saveListing').mockResolvedValueOnce({ id: 'test-id' });
    
    renderWithRouter(<CreateListing />);

    fireEvent.change(screen.getByLabelText(/job title:/i), {
      target: { value: 'Test Job' }
    });
    fireEvent.change(screen.getByLabelText(/description:/i), {
      target: { value: 'Test Description' }
    });

    fireEvent.click(screen.getByText(/save job listing/i));

    await waitFor(() => {
      expect(screen.getByText('Job listing "Test Job" saved successfully.')).toBeInTheDocument();
    });
  });
});