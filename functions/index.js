const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.getPlayerRecords = functions.https.onRequest((req, res) => {
    const gamesRef = db.collection('games');
    let games = [];
    gamesRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            let game = doc.data();
            games.push(game);
        });
        return games;
    })
    .catch(err => {
        console.log("error:", err);
    });

});