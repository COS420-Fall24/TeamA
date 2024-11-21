import React, { useEffect } from 'react';
import { auth } from '../firebase/firebaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                // If no user is signed in, redirect to login
                navigate('/login');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>This page is only accessible to logged-in users.</p>
        </div>
    );
};

export default Dashboard;
