import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/Search';
import Listing from '../../components/Listing';
import FirebaseService from '../../firebase/FirebaseService';

const Dashboard = () => {
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

    function onSearch(matches) {
        setListings(matches);
    }

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <SearchBar onSearch={onSearch} />
            <div className="listings-container">
                {listings.map((listing, index) => (
                    console.log(listing),
                    <Listing
                        key={index}
                        name={listing.name}
                        description={listing.description}
                    />
                ))}
            </div>

            <p>This page is only accessible to logged-in users.</p>

            {/*Prompt for AI */}
            <div>
                <input
                    type="text"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder='Ask AI about finding jobs...'
                />
            <button onClick={handleRequest}>Send Prompt</button>
            </div>

            {/*Display AI answer*/}
            {geminiResponse && (
                <div>
                    <h2>Gemini's Response:</h2>
                    <p>{geminiResponse}</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
