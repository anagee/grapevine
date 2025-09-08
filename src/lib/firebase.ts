import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "grapevine-trends",
  "appId": "1:839295368271:web:688abc28b5a782097b7e3a",
  "storageBucket": "grapevine-trends.firebasestorage.app",
  "apiKey": "AIzaSyBvL7iHMKHsXlfBvRyVkRuO1LO0_RxWgRQ",
  "authDomain": "grapevine-trends.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "839295368271"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
