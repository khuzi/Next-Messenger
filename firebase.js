import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCuhoYzzZehHXf_8LRuMx3ifBaUU2z8MEg",
  authDomain: "next-messenger-ce2e2.firebaseapp.com",
  projectId: "next-messenger-ce2e2",
  storageBucket: "next-messenger-ce2e2.appspot.com",
  messagingSenderId: "1000519479114",
  appId: "1:1000519479114:web:3a54088c2f52999b801bb3",
  measurementId: "G-GDV91FVGDH",
};

export default function firebaseClient() {
  if (typeof window !== "undefined" && !firebase.apps.length) {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    firebase.initializeApp(firebaseConfig);
  }
}
