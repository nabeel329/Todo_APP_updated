// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"; 

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT6dHsgrQnGIzi5eWTyIGdeuPzPeSnXrQ",
  authDomain: "todoapp-c3ab6.firebaseapp.com",
  projectId: "todoapp-c3ab6",
  storageBucket: "todoapp-c3ab6.firebasestorage.app",
  messagingSenderId: "919884991708",
  appId: "1:919884991708:web:196e4fe3fe865df0613819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc };
