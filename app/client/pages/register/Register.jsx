import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseService } from '../../firebase/FirebaseService';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import './Register.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await FirebaseService.registerWithEmailAndPassword(
        email, 
        password, 
        firstName, 
        lastName
      );
      setSuccess('Registration successful!');
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
            <div className="name-inputs">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="continue-button">Continue</button>
          </form>

          <p className="create-account">
            Already a member? <Link to="/login">Sign in</Link>
          </p>

          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
    
  );
}

export default Register;
