// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVwZk6BgeZJZ1SMDNtJKL7-BPgYd69R5E",
  authDomain: "ping00.firebaseapp.com",
  projectId: "ping00",
  storageBucket: "ping00.firebasestorage.app",
  messagingSenderId: "396510865733",
  appId: "1:396510865733:web:a144d479819075725e362c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services we’ll use
export const auth = getAuth(app);
export const db = getFirestore(app);
