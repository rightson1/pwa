import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuJOEsz9Qrn8YfEUfjtydFGVx6q0Lgclg",
    authDomain: "mkuvoting.firebaseapp.com",
    projectId: "mkuvoting",
    storageBucket: "mkuvoting.appspot.com",
    messagingSenderId: "703131689134",
    appId: "1:703131689134:web:76a061f61e3d936bae4d3f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);