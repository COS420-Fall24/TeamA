import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Mentor.css';

const Mentor = ({ name, expertise, description }) => {
  return (
    <div className="mentor-card">
      <h3 className="mentor-name">{name}</h3>
      <p className="mentor-expertise">{expertise}</p>
      <p className="mentor-description">{description}</p>
      <button className="request-mentor-btn">Request Mentor</button>
    </div>
  );
};

Mentor.propTypes = {
  name: PropTypes.string.isRequired,
  expertise: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Mentor;