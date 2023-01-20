import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDnCBUms_87GkwXG0r6DUI2Jt6Q2Qiqedw",
  authDomain: "ripped-8d337.firebaseapp.com",
  projectId: "ripped-8d337",
  storageBucket: "ripped-8d337.appspot.com",
  messagingSenderId: "738731752806",
  appId: "1:738731752806:web:f4f1bf2b783c2e13e09ca7",
  measurementId: "G-97XN78LMD6"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export {auth }