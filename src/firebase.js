import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAOd4rZVfUtgpq7BCJ7FRu1kbjmTzd9fRI",
  authDomain: "instagram-61003.firebaseapp.com",
  databaseURL: "https://instagram-61003.firebaseio.com",
  projectId: "instagram-61003",
  storageBucket: "instagram-61003.appspot.com",
  messagingSenderId: "671034896143",
  appId: "1:671034896143:web:3aceafdf2319c9f1fc587a",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
