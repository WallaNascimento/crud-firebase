// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqZu9TkQMlPhvd2ZrM5XuT55yjNwe5bEQ",
  authDomain: "firecrud0.firebaseapp.com",
  projectId: "firecrud0",
  storageBucket: "firecrud0.appspot.com",
  messagingSenderId: "556630346800",
  appId: "1:556630346800:web:76eae732999f4320b2f1f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);