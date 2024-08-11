import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCIiqTpwMd1IhwHBVsDtYV8buJ0VJWYng",
  authDomain: "monkey-blogging-b1fb5.firebaseapp.com",
  projectId: "monkey-blogging-b1fb5",
  storageBucket: "monkey-blogging-b1fb5.appspot.com",
  messagingSenderId: "319068973549",
  appId: "1:319068973549:web:cd4c906de9d61b3d775fe4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);