import React, { useState, useEffect } from 'react';
import { ref as dbRef, push, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { database } from '../../firebase/firebaseClient';
import '../../styles/Auth.css';
import Mentor from '../../components/Mentor';

function Mentors() {
    const [mentorName, setMentorName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [description, setDescription] = useState('');
    const [mentors, setMentors] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchMentors();
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchMentors = async () => {
        try {
            const mentorsRef = dbRef(database, 'mentors');
            const snapshot = await get(mentorsRef);

            if (snapshot.exists()) {
                const mentorsData = snapshot.val();
                const mentorsArray = Object.entries(mentorsData).map(([id, data]) => ({
                    id,
                    ...data
                }));
                setMentors(mentorsArray);
            }
        } catch (error) {
            setError('Error fetching mentors: ' + error.message);
        }
    };

    const saveMentor = async () => {
        if (!user) {
            setError("You must be logged in to register as a mentor.");
            return;
        }

        if (!mentorName || !expertise || !description) {
            setError("All fields are required.");
            return;
        }

        try {
            const mentorsRef = dbRef(database, 'mentors');
            const newMentor = {
                mentorName,
                expertise,
                description,
                createdAt: new Date().toISOString(),
                userId: user.uid,
                userEmail: user.email
            };

            await push(mentorsRef, newMentor);
            setMessage(`Mentor profile "${mentorName}" saved successfully.`);
            setError('');

            setMentorName('');
            setExpertise('');
            setDescription('');

            fetchMentors();
        } catch (err) {
            setError('Error saving mentor profile: ' + err.message);
        }
    };

    if (!user) {
        return (
            <div className="auth-container">
                <h2>Please Log In</h2>
                <p>You must be logged in to view and request mentors.</p>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <h2>Register as a Mentor</h2>

            {message && <p className="message" role="alert">{message}</p>}
            {error && <p className="error" role="alert">{error}</p>}

            <div>
                <label htmlFor="mentor-name">Name:</label>
                <input
                    id="mentor-name"
                    type="text"
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <div>
                <label htmlFor="mentor-expertise">Expertise:</label>
                <input
                    id="mentor-expertise"
                    type="text"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    placeholder="Enter your area of expertise"
                />
            </div>
            <div>
                <label htmlFor="mentor-description">Description:</label>
                <textarea
                    id="mentor-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your experience and what you can offer as a mentor"
                />
            </div>

            <button type="button" onClick={saveMentor}>
                Register as Mentor
            </button>

            <div className="mentors-list">
                <h3>Available Mentors:</h3>
                {mentors.length > 0 ? (
                    mentors.map((mentor) => (
                        <div key={mentor.id} className="mentor-item">
                            <Mentor
                                name={mentor.mentorName}
                                expertise={mentor.expertise}
                                description={mentor.description}
                            />
                            <small>
                                Posted by: {mentor.userEmail}<br />
                                Since: {new Date(mentor.createdAt).toLocaleDateString()}
                            </small>
                        </div>
                    ))
                ) : (
                    <p>No mentors available yet.</p>
                )}
            </div>
        </div>
    );
}

export default Mentors;