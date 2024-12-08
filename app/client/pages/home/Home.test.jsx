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
