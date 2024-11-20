import React, { useState } from 'react';
import { auth } from '../firebase/firebaseClient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setMessage('Login successful!');
            userCredential.user.getIdToken().then((token) => {
                // Store the token in local storage
                localStorage.setItem('firebaseToken', token);
            });
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Login; 