import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCgSYUIbc37fffwUlv6yKxtSyPi--9fuIU",
  authDomain: "whatsapp-4c185.firebaseapp.com",
  projectId: "whatsapp-4c185",
  storageBucket: "whatsapp-4c185.appspot.com",
  messagingSenderId: "604011395153",
  appId: "1:604011395153:web:e02d78329ebdb9989ee070",
  measurementId: "G-EG13PJ7K9R",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
