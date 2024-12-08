import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils';
import Listings from './Listing';
import { FirebaseService } from '../../firebase/FirebaseService';

describe('Listings Component', () => {
  const mockListings = [
    {
      id: '1',
      name: 'Software Engineer',
      description: 'Full-stack developer position',
      type: 'job'
    },
    {
      id: '2',
      name: 'Product Manager',
      description: 'Technical product management role',
      type: 'job'
    }
  ];

  beforeEach(() => {
    jest.spyOn(FirebaseService, 'getListings').mockResolvedValue(mockListings);
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

    expect(FirebaseService.getListings).toHaveBeenCalledWith('job');
  });

  it('should display error message when fetching listings fails', async () => {
    FirebaseService.getListings.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    renderWithRouter(<Listings />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch jobs')).toBeInTheDocument();
    });
  });

  it('should filter listings based on search', async () => {
    renderWithRouter(<Listings />);

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    const searchBar = screen.getByPlaceholderText('Search listings...');
    fireEvent.change(searchBar, { target: { value: 'Software' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      expect(screen.queryByText('Product Manager')).not.toBeInTheDocument();
    });
  });

  it('should render action buttons for each listing', async () => {
    renderWithRouter(<Listings />);

    await waitFor(() => {
      const favoriteButtons = screen.getAllByText('☆');
      const applyButtons = screen.getAllByText('Apply now');
      
      expect(favoriteButtons).toHaveLength(2);
      expect(applyButtons).toHaveLength(2);
    });
  });
}); 