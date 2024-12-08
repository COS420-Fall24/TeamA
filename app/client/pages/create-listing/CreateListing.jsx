import React, { useState } from 'react';
import Header from '../../components/Header';
import FirebaseService from '../../firebase/FirebaseService';
import '../../styles/CreateListing.css';
import '../../styles/Auth.css';

function CreateListing() {
    const [listingName, setListingName] = useState('');
    const [description, setDescription] = useState('');
    const [listingType, setListingType] = useState('job');
    const [expertise, setExpertise] = useState('');
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
            };

            await FirebaseService.saveListing(listingType, listingData);

            setMessage(`${listingType === 'job' ? 'Job' : 'Mentor'} listing "${listingName}" saved successfully.`);
            setError('');
            setListingName('');
            setDescription('');
            setExpertise('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="create-listing-page">
            <Header isLoggedIn={true} />
            <div className="create-listing-container">
            <h2 className="create-listing-header">Create New Listing</h2>

            {message && <p className="message success-message" role="alert">{message}</p>}
            {error && <p className="message error-message" role="alert">{error}</p>}

            <div className="listing-type-selector">
                <label>What type of listing would you like to create?</label>
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

            <div className="form-group">
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
                <div className="form-group">
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

            <div className="form-group">
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

            <button className="save-button" type="button" onClick={saveListing}>
                Save {listingType === 'job' ? 'Job' : 'Mentor'} Listing
                </button>
            </div>
        </div>
    );
}

export default CreateListing;