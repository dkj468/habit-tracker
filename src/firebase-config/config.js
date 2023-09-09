// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjHWci_xbUA6bx-_3nC_GioHTvdPjkF6o",
  authDomain: "habit-tracker-a60c5.firebaseapp.com",
  projectId: "habit-tracker-a60c5",
  storageBucket: "habit-tracker-a60c5.appspot.com",
  messagingSenderId: "89065214067",
  appId: "1:89065214067:web:d34d5106bd204f0edbda06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const GoogleProider = new GoogleAuthProvider();
export const db = getFirestore(app);
