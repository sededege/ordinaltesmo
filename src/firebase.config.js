import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDN9WeDUJ3V4J1HL5gzgXVfQPLPS4czc-o",
  authDomain: "ordinal-thesmo.firebaseapp.com",
  databaseURL: "https://ordinal-thesmo-default-rtdb.firebaseio.com/",
  projectId: "ordinal-thesmo",
  storageBucket: "ordinal-thesmo.appspot.com",
  messagingSenderId: "817576390966",
  appId: "1:817576390966:web:7a58c778c882ae021b4397",
  measurementId: "G-H98W3B2QN5"
}


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)
const database = getDatabase(app);


export { app, firestore, storage, auth,database }




