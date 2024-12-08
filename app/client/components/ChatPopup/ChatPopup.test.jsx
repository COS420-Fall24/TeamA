import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatPopup from './ChatPopup';

describe('ChatPopup Component', () => {

  it('should open the chatbox and show the initial message when clicked', () => {
    render(<ChatPopup />);

    // Initially, the chatbox should be closed
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();  // Chat input should not be visible initially

    // Click the AI image to open the chatbox
    fireEvent.click(screen.getByAltText('Chat'));  // Look for the image by its alt text

    // After opening the chatbox, check that the initial message is displayed
    expect(screen.getByText('No conversation yet. Ask job related questions!')).toBeInTheDocument();
  });

  it('should minimize the chatbox when the "-" button is clicked', () => {
    render(<ChatPopup />);

    // Initially, the chatbox should be closed
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    // Open the chatbox by clicking the AI image
    fireEvent.click(screen.getByAltText('Chat'));

    // After clicking, ensure the chatbox is visible
    expect(screen.getByText('Chat with AI')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();  // Chat input should be visible now

    // Click the "-" button to minimize the chatbox
    fireEvent.click(screen.getByText('-'));

    // After minimizing, check that the chat input is no longer visible
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    
    // Check that the chatbox is not visible anymore; the toggle button should still be there
    expect(screen.queryByText('Chat with AI')).not.toBeInTheDocument();
    expect(screen.getByAltText('Chat')).toBeInTheDocument();  // AI image should still be visible as toggle button
  });

});
