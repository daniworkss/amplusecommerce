// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBypbPaxRpuOSfhMsMbMXZ4VlCcfuvfz2w",
  authDomain: "amplusecommerce.firebaseapp.com",
  projectId: "amplusecommerce",
  storageBucket: "amplusecommerce.firebasestorage.app",
  messagingSenderId: "1063585400207",
  appId: "1:1063585400207:web:bca3289f04342764e9f7fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Firebase_db = getFirestore(app);
const Firebase_auth = getAuth(app);
const Firebase_storage = getStorage(app,'gs://amplusecommerce.firebasestorage.app');
export { Firebase_db, Firebase_auth, Firebase_storage };