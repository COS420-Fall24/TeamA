import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils';
import Listings from './Listing';
import { FirebaseService } from '../../firebase/FirebaseService';

describe('Listings Component', () => {
  const mockListings = [
    {
      id: '1',
      jobName: 'Software Engineer',
      description: 'Full-stack developer position'
    },
    {
      id: '2',
      jobName: 'Product Manager',
      description: 'Technical product management role'
    }
  ];

  beforeEach(() => {
    jest.spyOn(FirebaseService, 'getJobListings').mockResolvedValue(mockListings);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all job listings initially', async () => {
    renderWithRouter(<Listings />);

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      expect(screen.getByText('Product Manager')).toBeInTheDocument();
    });

    expect(FirebaseService.getJobListings).toHaveBeenCalledTimes(1);
  });

  it('should display error message when fetching listings fails', async () => {
    FirebaseService.getJobListings.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    renderWithRouter(<Listings />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch listings')).toBeInTheDocument();
    });
  });

  it('should filter listings based on search', async () => {
    renderWithRouter(<Listings />);

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    const searchBar = screen.getByPlaceholderText('Search listings...');
    fireEvent.change(searchBar, { target: { value: 'Software' } });
    fireEvent.submit(searchBar.closest('form'));

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      expect(screen.queryByText('Product Manager')).not.toBeInTheDocument();
    });
  });

  it('should render action buttons for each listing', async () => {
    renderWithRouter(<Listings />);

    await waitFor(() => {
      const favoriteButtons = screen.getAllByText('★');
      const applyButtons = screen.getAllByText('Apply now');
      
      expect(favoriteButtons).toHaveLength(2);
      expect(applyButtons).toHaveLength(2);
    });
  });
}); 