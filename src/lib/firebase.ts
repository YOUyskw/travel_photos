import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDvkcvyL8BX9_NnskkF313g8W-Qt42xDD0",
  authDomain: "trip-timeline-28131.firebaseapp.com",
  projectId: "trip-timeline-28131",
  storageBucket: "trip-timeline-28131.appspot.com",
  messagingSenderId: "1031812376136",
  appId: "1:1031812376136:web:d8e1a3743ff3910a9c1a7d",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);