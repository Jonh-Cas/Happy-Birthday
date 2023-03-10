// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { addDoc, collection, Firestore, FirestoreSettings, getFirestore, initializeFirestore } from "firebase/firestore";
import { addDocCumplesProps } from "./intFirebases";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// try {
//   initializeApp({
//   databaseURL: 'dfgdfg'
//   })
//   } catch (err) {
//   // we skip the "already exists" message which is
//   // not an actual error when we're hot-reloading
//   if (!/already exists/.test(err.message)) {
//   console.error('Firebase initialization error', err.stack)
//   }
//   }

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
const db = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});

// console.log('este es el FireStore => ', Firestore)
// console.log('este es el Settings => ', settings)

const addDocCumples = (data: addDocCumplesProps) => {

  addDoc(
    collection(db, 'cumples'),
    { ...data }
  ).then(resp => {
    console.log('La resp es => ', resp)
  })
    .catch(error => {
      console.log('El error es  => ', { error })
    })

}

export {
  authFirebase,
  addDocCumples,
}
