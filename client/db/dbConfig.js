import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBmj1ck2KrufXeUrW3ZFJN5WPa_5PhSzKI",
  authDomain: "saved-e754c.firebaseapp.com",
  projectId: "saved-e754c",
  storageBucket: "saved-e754c.firebasestorage.app",
  messagingSenderId: "859358466902",
  appId: "1:859358466902:web:ccaa0ac029e18cff92fcf7",
  measurementId: "G-3GSC5JC5GY",
};

let app;

if(getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const database = getFirestore(app);
const auth = getAuth(app);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { database, auth, analytics };
