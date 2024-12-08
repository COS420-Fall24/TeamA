import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Listing from '../../components/Listing';
import FirebaseService from '../../firebase/FirebaseService';
import Header from '../../components/Header';

const Home = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  return (
    <div className="home-page">
      <div className="home-content">
        <Header isLoggedIn={true} />
        <div className="centered-content">
          <h1>Welcome to EmpowerMaine</h1>
          <p>Let us help you find mentors and opportunities to help empower you to success</p>
        </div>

        <div className="listings-container">
          {listings.map((listing, index) => (
            <Listing
              key={index}
              name={listing.name}
              description={listing.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
