import React from 'react';
import PropTypes from 'prop-types';

function Listing({ name, description, expertise, type }) {
    return (
        <div className={`listing ${type}`}>
            <h2>{name}</h2>
            <p>{description}</p>
            {type === 'mentor' && expertise && (
                <p className="expertise">Expertise: {expertise}</p>
            )}
        </div>
    );
}

Listing.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    expertise: PropTypes.string,
    type: PropTypes.oneOf(['job', 'mentor']).isRequired
};

export default Listing; 