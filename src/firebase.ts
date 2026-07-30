import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFjggRU1iK1oONF93sAGRWJAjNPY8jAvE",
  authDomain: "safarnama-adventures.firebaseapp.com",
  projectId: "safarnama-adventures",
  storageBucket: "safarnama-adventures.firebasestorage.app",
  messagingSenderId: "296317042563",
  appId: "1:296317042563:web:ed073729376af32a3180b6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
