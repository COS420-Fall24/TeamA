import React from 'react';
import './JobWindow.css';

function JobWindow({ listing, onClose, onApply, isApplied }) {
  return (
    <div className="job-window-overlay">
      <div className="job-window">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="job-window-content">
          <h2>{listing.jobName}</h2>
          <div className="job-details">
            <p className="description">{listing.description}</p>
          </div>
          
          <div className="job-actions">
            <button 
              className={`apply-button ${isApplied ? 'applied' : ''}`} 
              onClick={onApply}
              disabled={isApplied}
            >
              {isApplied ? 'Already applied' : 'Apply now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobWindow;
