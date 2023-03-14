// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

//configuracion de firebase 
//Nota: esto debe de ir en las varibales de entorno 
const firebaseConfig = {
  apiKey: "AIzaSyBetroglEpEOST3xuzgd2TNgrju1esuR8U",
  authDomain: "happy-birthday-22350.firebaseapp.com",
  projectId: "happy-birthday-22350",
  storageBucket: "happy-birthday-22350.appspot.com",
  messagingSenderId: "99631667732",
  appId: "1:99631667732:web:40c150a8c386fc279ca501"
};


// Initialize Firebase
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const authFirebase  = getAuth(firebaseApp)


export {
  firebaseApp,
  authFirebase,
}
