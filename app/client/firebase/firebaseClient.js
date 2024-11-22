import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {

    apiKey: "AIzaSyDtoQrjI5PGNV6ggVY6LSc6nyZpQzuJo7M",

    authDomain: "teama-4383c.firebaseapp.com",

    databaseURL: "https://teama-4383c-default-rtdb.firebaseio.com",

    projectId: "teama-4383c",

    storageBucket: "teama-4383c.firebasestorage.app",

    messagingSenderId: "219792909473",

    appId: "1:219792909473:web:e7be6645d4225e88b4bce0"

  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);