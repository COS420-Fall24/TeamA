const admin = require('../firebaseConfig');

async function createUser(email, password) {
    const userRecord = await admin.auth().createUser({
        email: email,
        password: password
    });
    return userRecord;
}

async function verifyToken(idToken) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = {
    createUser,
    verifyToken
};