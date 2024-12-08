import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/Search';
import Listing from '../../components/Listing';
import { FirebaseService } from '../../firebase/FirebaseService';
import './Listing.css';
import JobWindow from '../../components/JobWindow';
import { ref as dbRef, get } from 'firebase/database';
import { database } from '../../firebase/firebaseClient';

function Listings() {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [error, setError] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('recent');
  const [listingType, setListingType] = useState('jobs');

  useEffect(() => {
    const unsubscribe = FirebaseService.checkAuth((user) => {
      setCurrentUser(user);
      if (user) {
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
    const savedFavorites = localStorage.getItem('favoriteJobs');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const fetchMentors = async () => {
    try {
      const mentorsRef = dbRef(database, 'mentors');
      const snapshot = await get(mentorsRef);

      if (snapshot.exists()) {
        const mentorsData = snapshot.val();
        const mentorsArray = Object.entries(mentorsData).map(([id, data]) => ({
          id,
          ...data
        }));
        setListings(mentorsArray);
        setAllListings(mentorsArray);
      } else {
        setListings([]);
        setAllListings([]);
      }
    } catch (error) {
      setError('Error fetching mentors: ' + error.message);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (listingType === 'jobs') {
          const jobs = await FirebaseService.getJobListings();
          setListings(jobs);
          setAllListings(jobs);
        } else {
          await fetchMentors();
        }
      } catch (err) {
        setError(`Failed to fetch ${listingType}`);
        console.error(err);
      }
    };

    fetchListings();
  }, [listingType]);

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
      localStorage.setItem('favoriteJobs', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  const getSortedListings = () => {
    let filteredListings = [...listings];

    switch (sortBy) {
      case 'favorites':
        return filteredListings.filter(listing =>
          favorites.has(listing.id)
        );

      case 'applied':
        return filteredListings.filter(listing =>
          appliedJobs.includes(listing.id)
        );

      case 'recent':
      default:
        return filteredListings.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  };

  return (
    <div className="listings-page">
      <Header isLoggedIn={true} />
      <div className="search-hero">
        <div className="listing-type-toggle">
          <button
            className={`toggle-button ${listingType === 'jobs' ? 'active' : ''}`}
            onClick={() => setListingType('jobs')}
          >
            Jobs
          </button>
          <button
            className={`toggle-button ${listingType === 'mentors' ? 'active' : ''}`}
            onClick={() => setListingType('mentors')}
          >
            Mentors
          </button>
        </div>
        <h1>Find your perfect {listingType === 'jobs' ? 'Job or Internship' : 'Mentor'}</h1>
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
              name={listingType === 'jobs' ? listing.jobName : listing.mentorName}
              description={listing.description}
              expertise={listingType === 'mentors' ? listing.expertise : null}
              type={listingType}
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
                {listingType === 'jobs' ? 'Apply now' : 'Request Mentor'}
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