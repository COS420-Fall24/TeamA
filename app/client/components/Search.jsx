import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Search.css';

const SearchBar = ({ onSearch, allListings, sortBy, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      onSearch(allListings);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const matches = allListings.filter(listing => {
      const name = (listing.name || '').toLowerCase();
      const description = (listing.description || '').toLowerCase();
      const expertise = (listing.expertise || '').toLowerCase();
      
      return name.includes(searchTermLower) || 
             description.includes(searchTermLower) ||
             expertise.includes(searchTermLower);
    });

    onSearch(matches);
  }, [searchTerm, allListings, onSearch]);

  // Add Enter key handler
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search listings..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        onKeyPress={handleKeyPress}
      />
      <select 
        value={sortBy} 
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="recent">Recently Posted</option>
        <option value="favorites">Favorites</option>
        <option value="applied">Applied</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  allListings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    jobName: PropTypes.string,
    description: PropTypes.string
  })),
  sortBy: PropTypes.string,
  onSortChange: PropTypes.func
};

export default SearchBar;