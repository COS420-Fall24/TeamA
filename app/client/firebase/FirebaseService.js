import { ref as dbRef, push, get } from 'firebase/database';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { database } from './firebaseClient';
import { GoogleAuthProvider } from 'firebase/auth';

export const FirebaseService = {
    auth: getAuth(),
    database: database,

    checkAuth(callback) {
        return onAuthStateChanged(this.auth, (user) => {
            callback(user);
        });
    },

    getCurrentUser() {
        return this.auth.currentUser;
    },

    async getJobListings() {
        try {
            const jobsRef = dbRef(this.database, 'jobs');
            const snapshot = await get(jobsRef);

            if (snapshot.exists()) {
                const jobsData = snapshot.val();
                return Object.entries(jobsData).map(([id, data]) => ({
                    id,
                    ...data
                }));
            }
            return [];
        } catch (error) {
            throw new Error(`Error fetching jobs: ${error.message}`);
        }
    },

    async saveJobListing(jobData) {
        const user = this.getCurrentUser();
        if (!user) {
            throw new Error('User must be authenticated to save jobs');
        }

        if (!jobData.jobName || !jobData.description) {
            throw new Error('Job name and description are required');
        }

        try {
            const jobsRef = dbRef(this.database, 'jobs');
            const newJob = {
                ...jobData,
                createdAt: new Date().toISOString(),
                userId: user.uid,
                userEmail: user.email
            };

            const result = await push(jobsRef, newJob);
            return result.key;
        } catch (error) {
            throw new Error(`Error saving job: ${error.message}`);
        }
    },

    async loginWithEmailAndPassword(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message || 'Login failed. Please try again.');
        }
    },

    async registerWithEmailAndPassword(email, password, firstName, lastName) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`
            });

            return user;
        } catch (error) {
            throw new Error(error.message || 'Registration failed. Please try again.');
        }
    },

    async signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(this.auth, provider);
            return result.user;
        } catch (error) {
            throw new Error(error.message || 'Google sign-in failed');
        }
    },

    async sendAuthenticatedRequest(endpoint, data) {
        const user = this.getCurrentUser();
        if (!user) {
            throw new Error('User must be authenticated to make this request');
        }

        try {
            const token = await user.getIdToken();
            const response = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Request failed: ${error.message}`);
        }
    },

    getUserFullName() {
        const user = this.getCurrentUser();
        return user?.displayName || 'Guest';
    }
};

export default FirebaseService; 