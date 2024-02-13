import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBsXTaW-bl9dsat9FBrJUEFDvbBH2xUjhc",
  authDomain: "expense-tracker-3814f.firebaseapp.com",
  projectId: "expense-tracker-3814f",
  storageBucket: "expense-tracker-3814f.appspot.com",
  messagingSenderId: "618232965682",
  appId: "1:618232965682:web:30fe2383b2230a57672a2b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { app, db, auth };