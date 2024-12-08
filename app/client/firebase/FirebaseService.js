import { ref as dbRef, push, get, set } from 'firebase/database';
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

    getUserFullName() {
        const user = this.getCurrentUser();
        return user?.displayName || 'Guest';
    },

    async getListings(type = 'job') {
        try {
            const listingsRef = dbRef(this.database, 'listings');
            const snapshot = await get(listingsRef);

            if (snapshot.exists()) {
                const listingsData = snapshot.val();
                return Object.entries(listingsData)
                    .map(([id, data]) => ({
                        id,
                        ...data
                    }))
                    .filter(listing => !type || listing.type === type);
            }
            return [];
        } catch (error) {
            throw new Error(`Error fetching listings: ${error.message}`);
        }
    },

    async saveListing(type = 'job', listingData) {
        const user = this.getCurrentUser();
        if (!user) {
            throw new Error('User must be authenticated to save listings');
        }

        if (!listingData.name || !listingData.description) {
            throw new Error('Name and description are required');
        }

        try {
            const listingsRef = dbRef(this.database, 'listings');
            const newListing = {
                ...listingData,
                type,
                createdAt: new Date().toISOString(),
                userId: user.uid,
                userEmail: user.email
            };

            const result = await push(listingsRef, newListing);
            return result.key;
        } catch (error) {
            throw new Error(`Error saving listing: ${error.message}`);
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

    async applyToListing(type = 'job', listingId, userId) {
        try {
            const applicationRef = dbRef(this.database, `users/${userId}/applications/listings/${listingId}`);
            await set(applicationRef, {
                appliedAt: new Date().toISOString(),
                status: 'pending',
                type
            });
        } catch (error) {
            console.error(`Error applying to listing:`, error);
            throw error;
        }
    },

    async getAppliedListings(type = 'job', userId) {
        try {
            const applicationsRef = dbRef(this.database, `users/${userId}/applications/listings`);
            const snapshot = await get(applicationsRef);
            if (snapshot.exists()) {
                const applications = snapshot.val();
                return Object.entries(applications)
                    .filter(([_, data]) => !type || data.type === type)
                    .map(([id]) => id);
            }
            return [];
        } catch (error) {
            console.error(`Error fetching applied listings:`, error);
            throw error;
        }
    },

};

export default FirebaseService; 