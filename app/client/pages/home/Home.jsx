import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Listing from '../../components/Listing';
import FirebaseService from '../../firebase/FirebaseService';
import Header from '../../components/Header';
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
                <h1>Welcome to the Home Page</h1>
                <div className="listings-container">
                    {listings.map((listing, index) => (
                        <Listing
                            key={index}
                            name={listing.name}
                            description={listing.description}
                        />
                    ))}
                </div>

                <div>
                    <input
                        type="text"
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        placeholder='Ask AI about finding jobs...'
                    />
                    <button onClick={handleRequest}>Send Prompt</button>
                </div>

                <br />
                <br />

                {geminiResponse && (
                    <div>
                        <h2>Gemini's Response:</h2>
                        <p>{geminiResponse}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
