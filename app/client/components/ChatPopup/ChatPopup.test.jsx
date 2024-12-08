import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatPopup from './ChatPopup'; // Adjust the import path as needed

describe('ChatPopup Component', () => {

  it('should open the chatbox when the "Chat with AI" button is clicked', () => {
    render(<ChatPopup />);

    // Initially, "Chat with Gemini" should not be visible because the chatbox is closed
    expect(screen.getByText('Chat with AI')).toBeInTheDocument();  // Chat with AI should be visible
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();  // Chat input is not visible initially

    // Click the "Chat with AI" button to open the chatbox
    fireEvent.click(screen.getByText('Chat with AI'));

    // After clicking, the chatbox should be visible
    expect(screen.getByText('Chat with Gemini')).toBeInTheDocument();  // Chat title should appear now
    expect(screen.getByRole('textbox')).toBeInTheDocument();  // Chat input should be visible now
  });

  it('should display "Chat with AI" when the chatbox is closed or minimized', () => {
    render(<ChatPopup />);

    // Ensure the "Chat with AI" button is visible when the chatbox is closed
    expect(screen.getByText('Chat with AI')).toBeInTheDocument();

    // Open the chatbox by clicking on the "Chat with AI" button
    fireEvent.click(screen.getByText('Chat with AI'));

    // Now close the chatbox
    fireEvent.click(screen.getByText('-'));

    // After minimizing, "Chat with AI" button should appear again
    expect(screen.getByText('Chat with AI')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();  // Ensure the chat input is not visible
  });

});
