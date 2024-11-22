import { screen, fireEvent, waitFor } from '@testing-library/react';
import JobListing from './JobListing';
import { renderWithRouter } from '../../test-utils';
import * as React from 'react';

describe('JobListing Component', () => {
  it('should show error message when submitting empty form', async () => {
    renderWithRouter(<JobListing />);
    
    fireEvent.click(screen.getByRole('button', { name: /save job/i }));
    
    expect(screen.getByText(/both job name and description are required/i))
      .toBeInTheDocument();
  });

  it('should submit successfully with valid job details', async () => {
    renderWithRouter(<JobListing />);
    
    const jobName = 'Software Engineer';
    
    fireEvent.change(screen.getByLabelText(/job name/i), {
      target: { value: jobName },
    });
    
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Full-stack developer position' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /save job/i }));
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        `Job "${jobName}" saved successfully.`
      );
    });
  });
});