import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/Search';
import Listing from '../../components/Listing';
import { FirebaseService } from '../../firebase/FirebaseService';
import './Listing.css';
import JobWindow from '../../components/JobWindow';

function Listings() {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [error, setError] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('recent');
  const [listingType, setListingType] = useState('job');

  useEffect(() => {
    const unsubscribe = FirebaseService.checkAuth((user) => {
      setCurrentUser(user);
      if (user) {
        FirebaseService.getAppliedListings(listingType, user.uid)
          .then(listings => setAppliedJobs(listings))
          .catch(err => console.error('Error fetching applied listings:', err));
      } else {
        setAppliedJobs([]);
      }
    });
    return () => unsubscribe();
  }, [listingType]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteJobs');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listings = await FirebaseService.getListings(listingType);
        console.log('Fetched listings:', listings);
        setListings(listings);
        setAllListings(listings);
      } catch (err) {
        setError(`Failed to fetch ${listingType}s`);
        console.error(err);
      }
    };

    fetchListings();
  }, [listingType]);

  const handleApply = async () => {
    if (!currentUser) {
      setError('Please log in to apply');
      return;
    }

    try {
      await FirebaseService.applyToListing(listingType, selectedListing.id, currentUser.uid);
      setAppliedJobs([...appliedJobs, selectedListing.id]);
      console.log(`Successfully applied to ${listingType}: ${selectedListing.name}`);
      setSelectedListing(null);
    } catch (err) {
      setError(`Failed to apply to ${listingType}`);
      console.error(err);
    }
  };

  const handleSearch = useCallback((matches) => {
    if (!matches || matches.length === 0) {
      const currentTypeListings = allListings.filter(listing => listing.type === listingType);
      setListings(currentTypeListings);
    } else {
      const filteredMatches = matches.filter(listing => listing.type === listingType);
      setListings(filteredMatches);
    }
  }, [allListings, listingType]);

  const handleFavorite = (jobId) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(jobId)) {
        newFavorites.delete(jobId);
      } else {
        newFavorites.add(jobId);
      }
      localStorage.setItem('favoriteJobs', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  const getSortedListings = useCallback(() => {
    return listings
      .filter(listing => listing && (listing.name || listing.jobTitle))
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return (a.name || a.jobTitle || '').localeCompare(b.name || b.jobTitle || '');
          case 'recent':
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          default:
            return 0;
        }
      });
  }, [listings, sortBy]);

  return (
    <div className="listings-page">
      <Header isLoggedIn={true} />
      <div className="search-hero">
        <div className="listing-type-toggle">
          <button
            className={`toggle-button ${listingType === 'job' ? 'active' : ''}`}
            onClick={() => setListingType('job')}
          >
            Jobs
          </button>
          <button
            className={`toggle-button ${listingType === 'mentor' ? 'active' : ''}`}
            onClick={() => setListingType('mentor')}
          >
            Mentors
          </button>
        </div>
        <h1>Find your perfect {listingType === 'job' ? 'Job or Internship' : 'Mentor'}</h1>
        <SearchBar
          onSearch={handleSearch}
          allListings={allListings}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="listings-container">
        {error && <p className="error">{error}</p>}
        {getSortedListings().map((listing) => {  
          console.log('Rendering listing:', listing);        
          return (
            <div
              key={listing.id}
              className="listing-wrapper"
              onClick={() => setSelectedListing(listing)}
            >
              <Listing
                name={listing.name || listing.jobTitle}
                description={listing.description}
                expertise={listing.type === 'mentor' ? listing.expertise : null}
                type={listing.type}
              />
              <div className="listing-actions">
                <button
                  className={`favorite-button ${favorites.has(listing.id) ? 'favorited' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(listing.id);
                  }}
                >
                  {favorites.has(listing.id) ? '★' : '☆'}
                </button>
                <button
                  className="apply-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedListing(listing);
                  }}
                >
                  {listingType === 'job' ? 'Apply now' : 'Request Mentor'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedListing && (
        <JobWindow
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onApply={handleApply}
          isApplied={appliedJobs.includes(selectedListing.id)}
        />
      )}
    </div>
  );
}

export default Listings;