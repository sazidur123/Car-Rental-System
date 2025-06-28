import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAECcblRlOjAKDBqTJgu57VOzVJITa5XCE",
  authDomain: "car-rental-system-52566.firebaseapp.com",
  projectId: "car-rental-system-52566",
  storageBucket: "car-rental-system-52566.appspot.com", // <-- fixed here
  messagingSenderId: "428526133592",
  appId: "1:428526133592:web:9078527d0a9585bd42852d",
  measurementId: "G-VJJV5W6EJ8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();