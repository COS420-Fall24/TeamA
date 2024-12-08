import React, { useState, useEffect } from 'react';
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
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'favorites', 'applied'

  useEffect(() => {
    const unsubscribe = FirebaseService.checkAuth((user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch applied jobs when user logs in
        FirebaseService.getAppliedJobs(user.uid)
          .then(jobs => setAppliedJobs(jobs))
          .catch(err => console.error('Error fetching applied jobs:', err));
      } else {
        setAppliedJobs([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await FirebaseService.getJobListings();
        setListings(jobs);
        setAllListings(jobs);
      } catch (err) {
        setError('Failed to fetch job listings');
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteJobs');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const handleApply = async () => {
    if (!currentUser) {
      setError('Please log in to apply for jobs');
      return;
    }

    try {
      await FirebaseService.applyToJob(selectedListing.id, currentUser.uid);
      setAppliedJobs([...appliedJobs, selectedListing.id]);
      console.log(`Successfully applied to job: ${selectedListing.jobName}`);
      setSelectedListing(null);
    } catch (err) {
      setError('Failed to apply to job');
      console.error(err);
    }
  };

  const handleSearch = (matches) => {
    setListings(matches.length > 0 ? matches : allListings);
  };

  const handleFavorite = (jobId) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(jobId)) {
        newFavorites.delete(jobId);
      } else {
        newFavorites.add(jobId);
      }
      // Save to localStorage
      localStorage.setItem('favoriteJobs', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  const getSortedListings = () => {
    let filteredListings = [...listings];
    
    switch (sortBy) {
      case 'favorites':
        // Only show favorited listings
        return filteredListings.filter(listing => 
          favorites.has(listing.id)
        );
      
      case 'applied':
        // Only show applied listings
        return filteredListings.filter(listing => 
          appliedJobs.includes(listing.id)
        );
      
      case 'recent':
      default:
        // Show all listings sorted by date
        return filteredListings.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  };

  return (
    <div className="listings-page">
      <Header isLoggedIn={true} />

      <div className="search-hero">
        <h1>Find your perfect Job or Internship</h1>
        <SearchBar 
          onSearch={handleSearch} 
          allListings={allListings}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="listings-container">
        {error && <p className="error">{error}</p>}
        {getSortedListings().map((listing) => (
          <div 
            key={listing.id} 
            className="listing-wrapper"
            onClick={() => setSelectedListing(listing)}
          >
            <Listing
              name={listing.jobName}
              description={listing.description}
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
                Apply now
              </button>
            </div>
          </div>
        ))}
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
