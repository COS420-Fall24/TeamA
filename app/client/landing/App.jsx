import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from '../register/Register';
import Login from '../login/Login';
import JobListing from '../jobListing/JobListing';
import './App.css';

function Home() {
  return <h2>EmpowerMaine</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>EmpowerMaine</h1>
          <nav className="nav">
            <div>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/jobListing" className="nav-link">Job Listing</Link>

            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobListing" element={<JobListing />} />
        </Routes>

        <footer className="App-footer">
          <p>© 2024 EmpowerMaine. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
