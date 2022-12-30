import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCLpB-DZT5oKAfOFJP2cpbxOtkDRrMAI3c",
    authDomain: "mkuvoting-1ae85.firebaseapp.com",
    projectId: "mkuvoting-1ae85",
    storageBucket: "mkuvoting-1ae85.appspot.com",
    messagingSenderId: "755505341081",
    appId: "1:755505341081:web:932097680694536c224e08"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);