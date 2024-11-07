// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMyOy8IrcoVUXMiN34oPGwp74tYPdC8h8",
  authDomain: "maravilla-store.firebaseapp.com",
  projectId: "maravilla-store",
  storageBucket: "maravilla-store.firebasestorage.app",
  messagingSenderId: "325649292178",
  appId: "1:325649292178:web:33a3d632f0938f8205bf4b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;