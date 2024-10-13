const admin = require('firebase-admin');

const serviceAccount = require('./firebaseCredentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teama-4383c-default-rtdb.firebaseio.com/"
});

module.exports = admin;