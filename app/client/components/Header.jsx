import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ isLoggedIn = false }) => {
  const location = useLocation();

  return (
    <header className="listings-header">
      <div className="header-content">
        <div className="logo-nav">
          <Link to="/" className="logo">EM</Link>
          <nav>
            {isLoggedIn ? (
              // Logged in navigation
              <>
                <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
                  Home
                </Link>
                <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                  Profile
                </Link>
                <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>
                  Jobs
                </Link>
                <Link to="/mentors" className={location.pathname === '/mentors' ? 'active' : ''}>
                  Mentors
                </Link>
                <Link to="/messages" className={location.pathname === '/messages' ? 'active' : ''}>
                  Messages
                </Link>
              </>
            ) : (
              // Guest navigation
              <>
                <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>
                  Register
                </Link>
                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
        {!isLoggedIn && (
          <Link to="/register" className="sign-up-button">Sign Up Now!</Link>
        )}
      </div>
    </header>
  );
};

export default Header;