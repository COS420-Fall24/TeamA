import React, { useState } from 'react';
import './ChatPopup.css';
import FirebaseService from '../../firebase/FirebaseService';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // Store chat history
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendPrompt = async (prompt) => {

    //instructions for gemini
    const initalMessage = "You are a helpful AI chatbot assistant that will assist job seekers on our website 'EmpowerMaine' discover job listings, apply to listings, etc. You will suggest helpful resources and assist the user with site functionality.";
    
    // Add user's prompt to chat history
    const newChatHistory = [...chatHistory, { sender: 'You', message: prompt }];
    setChatHistory(newChatHistory);

    try {
      const result = await FirebaseService.sendAuthenticatedRequest('gemini', { prompt: initalMessage + "\n" + prompt });
      // Add Gemini's response to chat history
      setChatHistory([...newChatHistory, { sender: 'Gemini', message: result.message }]);
    } catch (error) {
      console.error('Error sending prompt to backend:', error);
      // Handle error, e.g., navigate to login if not authenticated
    }
  };

  const handleSendMessage = () => {
    handleSendPrompt(message);
    setMessage('');
  };

  return (
    <div className="chat-popup-container">
      {isOpen && (
        <div className="chat-box">
          <button className="chat-close-button" onClick={toggleChat}>-</button>
          <h3>Chat with Gemini</h3>
          <div className="chat-messages">
            {chatHistory.length === 0 ? (
              <p>No conversation yet. Ask something!</p>
            ) : (
              chatHistory.map((chat, index) => (
                <div key={index} className={`chat-message ${chat.sender === 'You' ? 'user-message' : 'gemini-message'}`}>
                  <strong>{chat.sender}:</strong> {chat.message}
                </div>
              ))
            )}
          </div>
          <input
            type="text"
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question..."
          />
          <button className="chat-send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      )}
      <button className="chat-toggle-button" onClick={toggleChat}>
        {isOpen ? '' : 'Chat with AI'}
      </button>
    </div>
  );
};

export default ChatPopup;
