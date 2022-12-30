import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDpjP7qWeA3gfLnuO0V_4J7ZqcpGMeoz4",
    authDomain: "fakebook-e256d.firebaseapp.com",
    projectId: "fakebook-e256d",
    storageBucket: "fakebook-e256d.appspot.com",
    messagingSenderId: "8713618213",
    appId: "1:8713618213:web:5b997484fdfe107cc890cc"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);