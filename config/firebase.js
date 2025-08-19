// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_DATABASE_API_KEY,
  authDomain: process.env.DATABASEDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID ,
  appId: process.env.APPID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Firebase_db = getFirestore(app);
const Firebase_auth = getAuth(app);
const Firebase_storage = getStorage(app,`gs://${process.env.STORAGEBUCKET}`);
export { Firebase_db, Firebase_auth, Firebase_storage };