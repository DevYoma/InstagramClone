import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBpQncwYf19IIE5SU6psCuxIT_mlnG1EZI",
    authDomain: "yoma-instagram.firebaseapp.com",
    databaseURL: "https://yoma-instagram.firebaseio.com",
    projectId: "yoma-instagram",
    storageBucket: "yoma-instagram.appspot.com",
    messagingSenderId: "842124188949",
    appId: "1:842124188949:web:43552f3e47e4ef9742dd1c"

  });


  //why do we use firebaseApp.firestore();
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export  {db, auth, storage, firebase};