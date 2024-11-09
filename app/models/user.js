const admin = require('../firebaseConfig');


async function createUser(email, password) {
    const userRecord = admin.auth().createUser({
        email: email,
        password: password
    });
    return userRecord
}

async function checkLoginDetails(email, password) {
    const userCredential = await admin.auth().signInWithEmailAndPasswrod(email,password)
    const user = userCredential.user
    return user
}

module.exports = {
    createUser, checkLoginDetails
}