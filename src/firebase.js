  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { getStorage } from "firebase/storage";


const firebaseConfig = {

  apiKey: "AIzaSyAd8J5i4_U0KCjSu-U-LJp0qZllPJK5hnE",
  authDomain: "chessviewerpro.firebaseapp.com",
  projectId: "chessviewerpro",
  storageBucket: "chessviewerpro.firebasestorage.app",
  messagingSenderId: "630366142019",
  appId: "1:630366142019:web:5debd8737ca8af8b54def6",
  measurementId: "G-68G3GSF8M9"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
export const storage = getStorage(app);
