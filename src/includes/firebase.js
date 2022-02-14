import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyByrsFbeqaU2Zvs-Vp2mnHzfhWNfKFNJYM',
  authDomain: 'music-923d5.firebaseapp.com',
  projectId: 'music-923d5',
  storageBucket: 'music-923d5.appspot.com',
  messagingSenderId: '329989464375',
  appId: '1:329989464375:web:69262e01823183e7803ab2',
  measurementId: 'G-1729NMEL07',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export {
  auth,
  db,
  usersCollection,
};
