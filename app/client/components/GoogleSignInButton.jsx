import React from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseService from '../firebase/FirebaseService';

function GoogleSignInButton() {
    const navigate = useNavigate();
    
    const handleGoogleSignIn = async () => {
        try {
            await FirebaseService.signInWithGoogle();
            navigate('/dashboard');
        } catch (error) {
            console.error('Google sign-in failed:', error);
        }
    };

    return (
        <button onClick={handleGoogleSignIn} className="google-button">
            <img src="../../public/google-icon.svg" alt="Google" width="18" height="18" />
            Sign in with Google
        </button>
    );
}

export default GoogleSignInButton;