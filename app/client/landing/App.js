import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from '../register/Register';
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
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <footer className="App-footer">
          <p>© 2024 EmpowerMaine. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
