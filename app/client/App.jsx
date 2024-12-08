import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Listings from './pages/listing/Listing';
import JobListing from './pages/create-job/JobListing';
import ProtectedRoute from './components/ProtectedRoute';
import ChatPopup from './components/ChatPopup/ChatPopup';
import './App.css';

function App() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}

// AppWithRouter handles the logic for the routes and includes useLocation hook
function AppWithRouter() {
  const location = useLocation(); // Get the current location (route)

  // Check if the current route is either /login or /register
  const showChat = !['/login', '/register'].includes(location.pathname);

  return (
    <div className="App">
      {/* Conditionally render ChatPopup based on the current route */}
      {showChat && <ChatPopup />}

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
      <footer className="App-footer">
        <p>© 2024 EmpowerMaine. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
