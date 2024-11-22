import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Listings from './pages/listing/Listing';
import JobListing from './pages/create-job/JobListing';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/jobs" element={
            <ProtectedRoute>
              <Listings />
            </ProtectedRoute>
          } />
          <Route 
            path="/create-job" 
            element={
              <ProtectedRoute>
                <JobListing />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
      <footer className="App-footer">
        <p>© 2024 EmpowerMaine. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
