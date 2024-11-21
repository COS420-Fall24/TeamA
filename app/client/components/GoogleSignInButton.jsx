import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseClient';
import { useNavigate } from 'react-router-dom';

function GoogleSignInButton() {
    const navigate = useNavigate();
    
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
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