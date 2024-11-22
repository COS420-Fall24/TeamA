import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FirebaseService } from '../../firebase/FirebaseService';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            await FirebaseService.loginWithEmailAndPassword(email, password);
            setMessage('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                {/* Placeholder for the image/logo area */}
            </div>
            <div className="login-right">
                <div className="login-box">
                    <div className="logo">EM</div>
                    <h1>Welcome!</h1>
                    
                    <GoogleSignInButton />
                    
                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="continue-button">Continue</button>
                    </form>

                    <p className="create-account">
                        Not a member? <Link to="/register">Create account</Link>
                    </p>

                    {message && <p className="message">{message}</p>}
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login; 