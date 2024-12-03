import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils';
import Home from './Home';
import { FirebaseService } from '../../firebase/FirebaseService';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Home Component', () => {
  const mockGeminiResponse = {
    message: 'Here is some career advice'
  };

  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jest.spyOn(FirebaseService, 'sendAuthenticatedRequest').mockResolvedValue(mockGeminiResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the home page with initial elements', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Welcome to the Home Page')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask AI about finding jobs...')).toBeInTheDocument();
    expect(screen.getByText('Send Prompt')).toBeInTheDocument();
  });

  it('handles AI prompt submission successfully', async () => {
    renderWithRouter(<Home />);
    
    const input = screen.getByPlaceholderText('Ask AI about finding jobs...');
    const button = screen.getByText('Send Prompt');

    fireEvent.change(input, { target: { value: 'Give me career advice' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Gemini\'s Response:')).toBeInTheDocument();
      expect(screen.getByText('Here is some career advice')).toBeInTheDocument();
    });

    expect(FirebaseService.sendAuthenticatedRequest).toHaveBeenCalledWith('gemini', {
      prompt: 'Give me career advice'
    });
  });

  it('redirects to login when user is not authenticated', async () => {
    jest.spyOn(FirebaseService, 'sendAuthenticatedRequest')
      .mockRejectedValueOnce(new Error('User must be authenticated'));

    renderWithRouter(<Home />);
    
    const input = screen.getByPlaceholderText('Ask AI about finding jobs...');
    fireEvent.change(input, { target: { value: 'test prompt' } });
    const button = screen.getByText('Send Prompt');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
