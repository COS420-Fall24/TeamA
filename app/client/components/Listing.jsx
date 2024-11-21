import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Listing.css';

const Listing = ({ name, description }) => {
  return (
    <div className="listing-card">
      <h3 className="listing-title">{name}</h3>
      <p className="listing-description">{description}</p>
    </div>
  );
};

Listing.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Listing;
