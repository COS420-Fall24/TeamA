import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  it('renders the correct component based on the route', () => {
    // Render the App component wrapped in a MemoryRouter with the initial route set to /register
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );

    // Check if the Register component is rendered when the route is /register
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});
