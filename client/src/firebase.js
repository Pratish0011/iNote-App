// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlxxG2B4eW4t_gSLl-mVuwq_H2dfQCaQM",
  authDomain: "inote-61533.firebaseapp.com",
  projectId: "inote-61533",
  storageBucket: "inote-61533.appspot.com",
  messagingSenderId: "39864257119",
  appId: "1:39864257119:web:f0526ba11c15d525db29ea",
  measurementId: "G-G2QD65BJ7W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {})
    .catch(() => {});
};
