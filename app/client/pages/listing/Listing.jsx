import React, { useState } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/Search';
import Listing from '../../components/Listing';
import './Listing.css';

function Listings() {
  const [listings, setListings] = useState([]);

  const handleSearch = (matches) => {
    setListings(matches);
  };

  return (
    <div className="listings-page">
      <Header isLoggedIn={true} />

      {/* Hero Section with Search */}
      <div className="search-hero">
        <h1>Find your perfect Job or Internship</h1>
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Listings Section */}
      <div className="listings-container">
        {listings.map((listing, index) => (
          <div key={index} className="listing-wrapper">
            <Listing
              name={listing.name}
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
