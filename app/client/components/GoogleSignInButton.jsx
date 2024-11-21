import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseClient'
import { useNavigate } from 'react-router-dom';
function GoogleSignInButton() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setMessage('Google sign-in successful!');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message || 'Google sign-in failed. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default GoogleSignInButton;