import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import FirebaseService from '../../firebase/FirebaseService';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../firebase/FirebaseService', () => ({
  getUserFullName: jest.fn()
}));

describe('Home Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Set up navigate mock
    useNavigate.mockImplementation(() => mockNavigate);
    FirebaseService.getUserFullName.mockReturnValue('John Doe');
  });

  it('displays the user name in welcome message', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Welcome to EmpowerMaine, John!')).toBeInTheDocument();
  });

  it('renders the home page with initial elements', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Helpful Resources')).toBeInTheDocument();
  });
});
  it('renders resource cards with correct content', () => {
    renderWithRouter(<Home />);
    
    // Check if resource cards are rendered
    const resourceCards = screen.getAllByRole('heading', { level: 3 });
    expect(resourceCards.length).toBeGreaterThan(0);

    // Check if each resource card has required elements
    const readMoreButtons = screen.getAllByText('Read more');
    expect(readMoreButtons.length).toBeGreaterThan(0);

    // Check for image placeholders
    const imagePlaceholders = document.getElementsByClassName('image-placeholder');
    expect(imagePlaceholders.length).toBeGreaterThan(0);
  });

  it('renders see more button in resources section', () => {
    renderWithRouter(<Home />);
    
    const seeMoreButton = screen.getByText('See More');
    expect(seeMoreButton).toBeInTheDocument();
  });

  it('renders events section header', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Events near you')).toBeInTheDocument();
  });

  it('renders learn more button in hero section', () => {
    renderWithRouter(<Home />);
    
    const learnMoreButton = screen.getByText('Learn More');
    expect(learnMoreButton).toBeInTheDocument();
  });
