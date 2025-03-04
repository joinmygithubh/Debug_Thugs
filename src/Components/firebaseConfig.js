import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push, remove, set, update } from "firebase/database";

// Firebase configuration with only databaseURL
const firebaseConfig = {
  databaseURL: "https://debugthugs-5a369-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(firebaseApp);

export { db, ref, get, push, remove, set, update };
