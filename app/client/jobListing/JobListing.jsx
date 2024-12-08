import React, { useState, useEffect } from 'react';
import { ref as dbRef, push, get, child } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { database } from '../firebase/firebaseClient';
import '../styles/Auth.css';

function JobListing() {
    const [jobName, setJobName] = useState('');
    const [description, setDescription] = useState('');
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    // Check authentication status when component mounts
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchJobs();
            }
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const fetchJobs = async () => {
        try {
            const jobsRef = dbRef(database, 'jobs');
            const snapshot = await get(jobsRef);

            if (snapshot.exists()) {
                const jobsData = snapshot.val();
                const jobsArray = Object.entries(jobsData).map(([id, data]) => ({
                    id,
                    ...data
                }));
                setJobs(jobsArray);
            }
        } catch (error) {
            setError('Error fetching jobs: ' + error.message);
        }
    };

    const saveJob = async () => {
        // Check if user is authenticated
        if (!user) {
            setError("You must be logged in to post jobs.");
            return;
        }

        // Input validation
        if (!jobName || !description) {
            setError("Both job name and description are required.");
            return;
        }

        try {
            // Create a reference to the 'jobs' node in the database
            const jobsRef = dbRef(database, 'jobs');

            // Create new job object with user ID
            const newJob = {
                jobName,
                description,
                createdAt: new Date().toISOString(),
                userId: user.uid,
                userEmail: user.email
            };

            // Push the new job to Firebase
            await push(jobsRef, newJob);

            // Show success message
            setMessage(`Job "${jobName}" saved successfully.`);
            setError('');

            // Clear input fields
            setJobName('');
            setDescription('');

            // Refresh jobs list
            fetchJobs();
        } catch (err) {
            setError('Error saving job: ' + err.message);
        }
    };

    // If user is not authenticated, show login prompt
    if (!user) {
        return (
            <div className="auth-container">
                <h2>Please Log In</h2>
                <p>You must be logged in to post and view jobs.</p>
                {/* Add your login button/component here */}
            </div>
        );
    }

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