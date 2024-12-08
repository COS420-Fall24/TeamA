import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Listing.css';

const Listing = ({ name, description, expertise, type }) => {
  return (
    <div className="listing-card">
      <h3 className="listing-title">{name}</h3>
      {type === 'mentors' && expertise && (
        <p className="listing-expertise">Expertise: {expertise}</p>
      )}
      <p className="listing-description">{description}</p>
    </div>
  );
};

Listing.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  expertise: PropTypes.string,
  type: PropTypes.oneOf(['jobs', 'mentors'])
};

export default Listing; 