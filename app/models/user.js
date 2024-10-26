const admin = require('../firebaseConfig');


async function createUser(email, password) {
    const userRecord = admin.auth().createUser({
        email: email,
        password: password
    });
    return userRecord
}

async function checkLoginDetails(username, password) {

}

module.exports = {
    createUser, checkLoginDetails
}