import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Register from '../register/Register';
import Login from '../login/Login';
import Dashboard from '../dashboard/Dashboard';
import './App.css';

function Home() {
  return <h2>EmpowerMaine</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ConditionalHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <footer className="App-footer">
          <p>© 2024 EmpowerMaine. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

function ConditionalHeader() {
  const location = useLocation();

  // Check if the current path is '/dashboard'
  if (location.pathname === '/dashboard') {
    return null; // Do not render the header
  }

  return (
    <header className="App-header">
      <h1>EmpowerMaine</h1>
      <nav className="nav">
        <div>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </div>
      </nav>
    </header>
  );
}

export default App;
