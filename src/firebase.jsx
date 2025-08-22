import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv9Gc31utguOMateSGyfk5ac6mpuJYM7E",
  authDomain: "expense-tracker-app-b4585.firebaseapp.com",
  projectId: "expense-tracker-app-b4585",
  storageBucket: "expense-tracker-app-b4585.appspot.com", // ✅ fix here
  messagingSenderId: "387669151133",
  appId: "1:387669151133:web:0fd7bc6b58caa884817374"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
