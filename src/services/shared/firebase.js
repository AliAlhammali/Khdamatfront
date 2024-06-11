import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBMPwCXxkzC0mnclOPLsfF5GIMKcnO3zNc",
    authDomain: "khadamat-otp-b5aa0.firebaseapp.com",
    projectId: "khadamat-otp-b5aa0",
    storageBucket: "khadamat-otp-b5aa0.appspot.com",
    messagingSenderId: "1049352682995",
    appId: "1:1049352682995:web:f11028c22acc5749506686",
    measurementId: "G-BTZ6JDEWJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };