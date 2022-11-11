import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDehjrad5QLca-V1rNzX2BaSuoLvW3KSpw",
    authDomain: "react-facebook-firebaseauth.firebaseapp.com",
    projectId: "react-facebook-firebaseauth",
    storageBucket: "react-facebook-firebaseauth.appspot.com",
    messagingSenderId: "706862051830",
    appId: "1:706862051830:web:2badc9bd5d7eceaff257d7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);