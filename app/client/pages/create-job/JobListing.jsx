import React, { useState } from 'react';
import FirebaseService from '../../firebase/FirebaseService';
import '../../styles/Auth.css';

function JobListing() {
    const [listingName, setListingName] = useState('');
    const [description, setDescription] = useState('');
    const [listingType, setListingType] = useState('job'); // Default to job
    const [expertise, setExpertise] = useState(''); // For mentors only
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const saveListing = async () => {
        try {
            if (!listingName.trim() || !description.trim()) {
                setError('Both name and description are required');
                return;
            }

            if (listingType === 'mentor' && !expertise.trim()) {
                setError('Expertise is required for mentor listings');
                return;
            }

            const listingData = {
                name: listingName,
                description,
                ...(listingType === 'mentor' && { expertise }),
                createdAt: new Date().toISOString()
            };

            if (listingType === 'job') {
                await FirebaseService.saveJobListing({
                    jobName: listingName,
                    description: description
                });
            } else {
                await FirebaseService.saveMentorListing({
                    mentorName: listingName,
                    expertise: expertise,
                    description: description
                });
            }

            setMessage(`${listingType === 'job' ? 'Job' : 'Mentor'} "${listingName}" saved successfully.`);
            setError('');
            // Clear form
            setListingName('');
            setDescription('');
            setExpertise('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create New Listing</h2>

            {message && <p className="message" role="alert">{message}</p>}
            {error && <p className="error" role="alert">{error}</p>}

            <div className="listing-type-selector">
                <label>Listing Type:</label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            value="job"
                            checked={listingType === 'job'}
                            onChange={(e) => setListingType(e.target.value)}
                        />
                        Job Listing
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            value="mentor"
                            checked={listingType === 'mentor'}
                            onChange={(e) => setListingType(e.target.value)}
                        />
                        Mentor Listing
                    </label>
                </div>
            </div>

            <div>
                <label htmlFor="listing-name">
                    {listingType === 'job' ? 'Job Title:' : 'Mentor Name:'}
                </label>
                <input
                    id="listing-name"
                    type="text"
                    value={listingName}
                    onChange={(e) => setListingName(e.target.value)}
                    placeholder={listingType === 'job' ? "Enter job title" : "Enter mentor name"}
                />
            </div>

            {listingType === 'mentor' && (
                <div>
                    <label htmlFor="expertise">Expertise:</label>
                    <input
                        id="expertise"
                        type="text"
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        placeholder="Enter area of expertise"
                    />
                </div>
            )}

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={listingType === 'job' ?
                        "Enter job description" :
                        "Describe your experience and what you can offer as a mentor"
                    }
                />
            </div>

            <button type="button" onClick={saveListing}>
                Save {listingType === 'job' ? 'Job' : 'Mentor'} Listing
            </button>
        </div>
    );
}

export default JobListing;