// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHfRsxJWtC20Oc50qwm2t1aCTrD91TGL8",
    authDomain: "patriot-web-13cae.firebaseapp.com",
    projectId: "patriot-web-13cae",
    storageBucket: "patriot-web-13cae.appspot.com",
    messagingSenderId: "547709879874",
    appId: "1:547709879874:web:049687267c6185295d8fdb",
    measurementId: "G-M7Q74HKT0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);