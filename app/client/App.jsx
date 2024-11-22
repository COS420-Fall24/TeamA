import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Listings from './pages/listing/Listing';
import JobListing from './pages/jobListing/JobListing';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Listings />} />
          <Route path="/create-listing" element={<JobListing />} />
        </Routes>
      </div>
      <footer className="App-footer">
        <p>© 2024 EmpowerMaine. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
