const admin = require('firebase-admin');

const serviceAccount = {
  type: "service_account",
  project_id: "teama-4383c",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: "firebase-adminsdk-rof3r@teama-4383c.iam.gserviceaccount.com",
  client_id: "100784380467805627674",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rof3r%40teama-4383c.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teama-4383c-default-rtdb.firebaseio.com/"
});

module.exports = admin;