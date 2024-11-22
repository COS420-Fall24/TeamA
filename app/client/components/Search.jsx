import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ initialSearch = '', onSearch, allListings = [] }) => {
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
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search listings..."
        aria-label="Search listings"
      />
      <button type="submit">Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  initialSearch: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  allListings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    jobName: PropTypes.string,
    description: PropTypes.string
  }))
};

export default SearchBar;