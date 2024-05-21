import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACHtaxxXz8CKcmdTxcTfJ3zWyApMv0gNU",
  authDomain: "fire-app-6ceb0.firebaseapp.com",
  projectId: "fire-app-6ceb0",
  storageBucket: "fire-app-6ceb0.appspot.com",
  messagingSenderId: "740964865459",
  appId: "1:740964865459:web:958f9e4e7f456b4cb4e7c6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
