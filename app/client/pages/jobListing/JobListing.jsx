import React, { useState, useEffect } from 'react';
import FirebaseService from '../../firebase/FirebaseService';
import '../../styles/Auth.css';

function JobListing() {
    const [jobName, setJobName] = useState('');
    const [description, setDescription] = useState('');
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const fetchJobs = async () => {
        try {
            const jobsArray = await FirebaseService.getJobListings();
            setJobs(jobsArray);
        } catch (error) {
            setError(error.message);
        }
    };

    const saveJob = async () => {
        try {
            await FirebaseService.saveJobListing({
                jobName,
                description
            });

            setMessage(`Job "${jobName}" saved successfully.`);
            setError('');
            setJobName('');
            setDescription('');
            fetchJobs();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Job Listing</h2>

            {/* Display messages */}
            {message && <p className="message" role="alert">{message}</p>}
            {error && <p className="error" role="alert">{error}</p>}

            {/* Input fields for job name and description */}
            <div>
                <label htmlFor="job-name">Job Name:</label>
                <input
                    id="job-name"
                    type="text"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    placeholder="Enter job name"
                />
            </div>
            <div>
                <label htmlFor="job-description">Job Description:</label>
                <textarea
                    id="job-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter job description"
                />
            </div>

            <button type="button" onClick={saveJob}>
                Save Job
            </button>

            {/* Display saved jobs */}
            <div className="jobs-list">
                <h3>Saved Jobs:</h3>
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job.id} className="job-item">
                            <h4>{job.jobName}</h4>
                            <p>{job.description}</p>
                            <small>
                                Posted by: {job.userEmail}<br />
                                Created: {new Date(job.createdAt).toLocaleDateString()}
                            </small>
                        </div>
                    ))
                ) : (
                    <p>No jobs saved yet.</p>
                )}
            </div>
        </div>
    );
}

export default JobListing;