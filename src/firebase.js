// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdXY2pB-EDiOYfWUoq7nbOQi1sBRXAjvc",
    authDomain: "lablink-e6c8b.firebaseapp.com",
    projectId: "lablink-e6c8b",
    storageBucket: "lablink-e6c8b.appspot.com",
    messagingSenderId: "1008297999888",
    appId: "1:1008297999888:web:49321cd8fe8b8cd1371495",
    measurementId: "G-KPD80PH61M"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
