import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXGHMYEKOscLfhJXsPhW5VKrl7lpafbgA",
  authDomain: "meme-1a717.firebaseapp.com",
  projectId: "meme-1a717",
  storageBucket: "meme-1a717.appspot.com",
  messagingSenderId: "731750031431",
  appId: "1:731750031431:web:facb6157b8eb11bf60d162"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
