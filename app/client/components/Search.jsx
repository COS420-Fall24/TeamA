import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const mockData = [
  {
    name: 'hello2',
    description: 'This is a description of the listing'
  },
  {
    name: 'hello',
    description: 'This is a description of the listing'
  },
  {
    name: 'test3',
    description: 'This is a description of the listing'
  }
]

const SearchBar = ({ initialSearch = '', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const matches = mockData.filter(item => 
      item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
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
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;