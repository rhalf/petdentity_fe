// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC4aWFeXM2zFJrguqva19UzcTjABJsV5PU",
//   authDomain: "petdentity-b6b3b.firebaseapp.com",
//   projectId: "petdentity-b6b3b",
//   storageBucket: "petdentity-b6b3b.appspot.com",
//   messagingSenderId: "244471824032",
//   appId: "1:244471824032:web:103240727db8e86c7593c5",
//   measurementId: "G-4DTW3QXLRX",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCTyY-7kjjK4uHk_OviKyLpe4FqWZwmzsY",
  authDomain: "petdentity-ccf29.firebaseapp.com",
  projectId: "petdentity-ccf29",
  storageBucket: "petdentity-ccf29.appspot.com",
  messagingSenderId: "399809619668",
  appId: "1:399809619668:web:3b032da450952ed6ef3d41",
  measurementId: "G-TN15S0EPS6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

export { analytics, auth, firestore, storage, messaging };
