import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseClient';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/Search';
import Listing from '../components/Listing';
const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleRequest = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken();
                const response = await fetch('/api/openai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ data: 'yourData' })
                });

                const result = await response.json();
                console.log('Response from backend:', result);
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
            <button onClick={handleRequest}>Send Token to Backend</button>
        </div>
    );
};

export default Dashboard;
