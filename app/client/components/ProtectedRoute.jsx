import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectIfNotLoggedIn } from '../firebase/authUtils';

function ProtectedRoute({ children }) {
    const [authState, setAuthState] = useState({
        isLoading: true,
        isAuthenticated: false
    });
    const navigate = useNavigate();

    useEffect(() => {
        const cleanup = redirectIfNotLoggedIn('login', 
            // onAuthenticated callback
            () => setAuthState({
                isLoading: false,
                isAuthenticated: true
            }), 
            navigate
        );

        return () => cleanup();
    }, [navigate]);

    if (authState.isLoading) {
        return (
            <div className="auth-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (!authState.isAuthenticated) {
        return (
            <div className="auth-container">
                <p>Please log in</p>
                <p>You must be logged in to post and view jobs</p>
            </div>
        );
    }

    return children;
}

export default ProtectedRoute; 