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
      description: 'Full-stack developer position'
    },
    {
      id: '2',
      name: 'Product Manager',
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
      expect(screen.getByText('Full-stack developer position')).toBeInTheDocument();
      expect(screen.getByText('Technical product management role')).toBeInTheDocument();
    });

    expect(FirebaseService.getJobListings).toHaveBeenCalledTimes(1);
  });

  it('should display error message when fetching listings fails', async () => {
    FirebaseService.getJobListings.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    renderWithRouter(<Listings />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch job listings')).toBeInTheDocument();
    });
  });

  it('should filter listings based on search', async () => {
    renderWithRouter(<Listings />);

    await waitFor(() => {
      expect(screen.getByText('Full-stack developer position')).toBeInTheDocument();
    });

    const searchBar = screen.getByPlaceholderText('Search listings...');
    fireEvent.change(searchBar, { target: { value: 'Full-stack' } });
    fireEvent.click(screen.getByText('Search'));
    
    await waitFor(() => {
      expect(screen.getByText('Full-stack developer position')).toBeInTheDocument();
      expect(screen.queryByText('Technical product management role')).not.toBeInTheDocument();
    });
  });

  it('should sort listings by recently posted', async () => {
    renderWithRouter(<Listings />);

    const sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'recent' } });
    
    await waitFor(() => {
      const listings = document.getElementsByClassName('listing-wrapper');
      expect(listings[0]).toHaveTextContent('Full-stack developer position');
      expect(listings[1]).toHaveTextContent('Technical product management role');
    });
  });

  it('should sort listings by favorites', async () => {
    // Mock localStorage
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue(JSON.stringify(['2'])), // ID of the Product Manager listing
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    FirebaseService.getJobListings.mockResolvedValueOnce(mockListings);
    renderWithRouter(<Listings />);

    const sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'favorites' } });
    
    await waitFor(() => {
      const listings = document.getElementsByClassName('listing-wrapper');
      expect(listings[0]).toHaveTextContent('Technical product management role');    });
  });
}); 