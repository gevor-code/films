// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBejQ9w9lzRXs9QFD3VYYImL8a5l8pbM5k",
    authDomain: "project-6607b.firebaseapp.com",
    projectId: "project-6607b",
    storageBucket: "project-6607b.appspot.com",
    messagingSenderId: "657179357693",
    appId: "1:657179357693:web:f62b55db171daa321ba994",
    measurementId: "G-808Q3P3RKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth()
export const storage = getStorage(app)