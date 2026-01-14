import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBavUu2hz-r-WMHy3P-PATQmtVJJHCTW-c",
  authDomain: "smart-issue-board-45b96.firebaseapp.com",
  projectId: "smart-issue-board-45b96",
  storageBucket: "smart-issue-board-45b96.firebasestorage.app",
  messagingSenderId: "268034563233",
  appId: "1:268034563233:web:6bafcf8d0b1419f741a4e0",
  measurementId: "G-F5X4YY4FB6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);