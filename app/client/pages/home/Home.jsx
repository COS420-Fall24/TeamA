import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Listing from '../../components/Listing';
import FirebaseService from '../../firebase/FirebaseService';
import Header from '../../components/Header';
import resources from './resources'
import './Home.css';  // Make sure this path is correct

const Home = () => {
    const navigate = useNavigate();

    const [listings, setListings] = useState([]);
    const [userPrompt, setUserPrompt] = useState('');
    const [geminiResponse, setGeminiResponse] = useState('');

    
    const handleRequest = async () => {
        try {
            const result = await FirebaseService.sendAuthenticatedRequest('gemini', {
                prompt: userPrompt
            });
            setGeminiResponse(result.message);
        } catch (error) {
            console.error('Error sending prompt to backend:', error);
            if (error.message.includes('must be authenticated')) {
                navigate('/login');
            }
        }
    };

    return (
        <div className="home-page">
            <div className="home-content">
                <Header isLoggedIn={true} />
                
                <div className="hero-section">
                    <h1>Welcome to EmpowerMaine!</h1>
                    <p>Let us help you find mentors and opportunities to help empower you to success</p>
                    <button className="learn-more-btn">Learn More</button>
                </div>

                <div className="ai-chat-section">
                    <div className="prompt-container">
                        <input
                            type="text"
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            placeholder='Ask AI about finding jobs...'
                            className="prompt-input"
                        />
                        <button onClick={handleRequest} className="prompt-button">Send Prompt</button>
                    </div>

                    {geminiResponse && (
                        <div className="response-container">
                            <h2>Gemini's Response:</h2>
                            <p>{geminiResponse}</p>
                        </div>
                    )}

                    <div className="listings-container">
                        {listings.map((listing, index) => (
                            <Listing
                                key={index}
                                name={listing.name}
                                description={listing.description}
                            />
                        ))}
                    </div>
                </div>

                <div className="resources-section">
                    <div className="section-header">
                        <h2>Helpful Resources</h2>
                        <h2>Events near you</h2>
                    </div>
                    
                    <div className="resources-grid">
                        {resources.map((resource, index) => (
                            <div key={index} className="resource-card">
                                <div className="card-content">
                                    <h3>{resource.title}</h3>
                                    <p>{resource.description}</p>
                                    <div className="image-placeholder"></div>
                                    <button className="read-more-btn">Read more</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className="see-more-btn">See More</button>
                </div>
            </div>
        </div>
    );
};

export default Home;