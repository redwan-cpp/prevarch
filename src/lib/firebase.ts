// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBemAuu829yoEvKmaIvsBf67VSdzCGdmXI",
  authDomain: "prevarchform.firebaseapp.com",
  projectId: "prevarchform",
  storageBucket: "prevarchform.firebasestorage.app",
  messagingSenderId: "493026728311",
  appId: "1:493026728311:web:92379d97aeacaa7834e972",
  measurementId: "G-4TJXH89ZTC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);