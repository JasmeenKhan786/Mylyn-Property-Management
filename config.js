import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyBc5r_h4Ew3y_vA9keI-1ginw4XmRCjHoo",
    authDomain: "rent-app-c0eec.firebaseapp.com",
    databaseURL: "https://rent-app-default-rtdb.firebaseio.com",
    projectId: "rent-app-c0eec",
    storageBucket: "rent-app-c0eec.appspot.com",
    messagingSenderId: "701307265538",
    appId: "1:701307265538:web:805c057d282b7279a4bd1b"
  };
  if (!firebase.apps.length){firebase.initializeApp(firebaseConfig)}

export default firebase.firestore()