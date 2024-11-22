import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/Search';
import Listing from '../../components/Listing';
import { FirebaseService } from '../../firebase/FirebaseService';
import './Listing.css';

function Listings() {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const jobs = await FirebaseService.getJobListings();
        setAllListings(jobs);
        setListings(jobs); // Initially show all listings
      } catch (err) {
        setError('Failed to fetch listings');
        console.error(err);
      }
    };

    fetchListings();
  }, []);

  const handleSearch = (matches) => {
    setListings(matches);
  };

  return (
    <div className="listings-page">
      <Header isLoggedIn={true} />

      <div className="search-hero">
        <h1>Find your perfect Job or Internship</h1>
        <div className="search-container">
          <SearchBar onSearch={handleSearch} allListings={allListings} />
        </div>
      </div>

      <div className="listings-container">
        {error && <p className="error">{error}</p>}
        {listings.map((listing) => (
          <div key={listing.id} className="listing-wrapper">
            <Listing
              name={listing.jobName}
              description={listing.description}
            />
            <div className="listing-actions">
              <button className="favorite-button">★</button>
              <button className="apply-button">Apply now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
