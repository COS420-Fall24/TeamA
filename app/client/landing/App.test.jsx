import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  it('renders the EmpowerMaine title and navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    //check for main title and footer text
    expect(screen.getByText(/EmpowerMaine/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2024 EmpowerMaine. All rights reserved./i)).toBeInTheDocument();

    //check for navigation links
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
  });

  it('navigates to Home page when Home link is clicked', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    //click on Home link
    const homeLink = screen.getByRole('link', { name: /Home/i });
    await userEvent.click(homeLink);

    //check if the Home page content is displayed
    expect(screen.getByText(/EmpowerMaine/i)).toBeInTheDocument();
  });

  it('navigates to Register page when Register link is clicked', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    //click on Register link
    const registerLink = screen.getByRole('link', { name: /Register/i });
    await userEvent.click(registerLink);

    //check if the Register component is rendered
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});
