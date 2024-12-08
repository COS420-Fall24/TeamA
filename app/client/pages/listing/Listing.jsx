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
          <div 
            key={listing.id} 
            className="listing-wrapper"
          >
            <Listing
              name={listing.jobName}
              description={listing.description}
            />
            <div className="listing-actions">
              <button 
                className="favorite-button"
                onClick={(e) => e.stopPropagation()}
              >★</button>
              <button 
                className="apply-button"
                onClick={() => setSelectedListing(listing)}
              >Apply now</button>
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
