import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMpBGHbkPihf-3AfMkSzZkiZ3lM0QGspY",
  authDomain: "doitapp-df4d2.firebaseapp.com",
  databaseURL: "https://doitapp-df4d2-default-rtdb.firebaseio.com",
  projectId: "doitapp-df4d2",
  storageBucket: "doitapp-df4d2.appspot.com",
  messagingSenderId: "421081633084",
  appId: "1:421081633084:web:1ef6cef214b7afaa108e39",
  measurementId: "G-6TCLDWTK0Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
