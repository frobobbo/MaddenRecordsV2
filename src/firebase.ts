import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAnLok7gkB-Gsgqsz38BK8rFrQj-RZhFOA",
    authDomain: "maddenrecords-47d61.firebaseapp.com",
    databaseURL: "https://maddenrecords-47d61.firebaseio.com",
    projectId: "maddenrecords-47d61",
    storageBucket: "maddenrecords-47d61.appspot.com",
    messagingSenderId: "608505473555",
    appId: "1:608505473555:web:50552e677eeb697b3bade6",
    measurementId: "G-42DC5T8RVF"
});

const db = firebaseApp.firestore();

export {db};