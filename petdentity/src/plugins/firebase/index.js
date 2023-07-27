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
  apiKey: "AIzaSyCfGAPrWi8ZsqmMUZnr5jwVd_6p4u4Sy68",
  authDomain: "petdentity-c98e6.firebaseapp.com",
  projectId: "petdentity-c98e6",
  storageBucket: "petdentity-c98e6.appspot.com",
  messagingSenderId: "997443954488",
  appId: "1:997443954488:web:8be71a30e45aff417f43cd",
  measurementId: "G-8PHXZLXM8Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

export { analytics, auth, firestore, storage, messaging };
