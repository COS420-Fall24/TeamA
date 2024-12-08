import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Search.css';

const SearchBar = ({ initialSearch = '', onSearch, allListings = [], sortBy, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allListings.length) return;

    const matches = allListings.filter(item => 
      item.jobName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(matches);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search listings..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
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
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

SearchBar.propTypes = {
  initialSearch: PropTypes.string,
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