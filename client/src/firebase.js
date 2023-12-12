// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "frost-app-bfbd0.firebaseapp.com",
    projectId: "frost-app-bfbd0",
    storageBucket: "frost-app-bfbd0.appspot.com",
    messagingSenderId: "830563257106",
    appId: "1:830563257106:web:cab6b8b3807b822d61c1cb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);