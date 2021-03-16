import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyCuhoYzzZehHXf_8LRuMx3ifBaUU2z8MEg",
  authDomain: "next-messenger-ce2e2.firebaseapp.com",
  projectId: "next-messenger-ce2e2",
  storageBucket: "next-messenger-ce2e2.appspot.com",
  messagingSenderId: "1000519479114",
  appId: "1:1000519479114:web:3a54088c2f52999b801bb3",
  measurementId: "G-GDV91FVGDH",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // Check that `window` is in scope for the analytics module!
  if (typeof window !== "undefined") {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ("measurementId" in firebaseConfig) {
      firebase.analytics();
      firebase.performance();
    }
  }
}

export default firebase;
