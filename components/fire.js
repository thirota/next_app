import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBpqz7zRbwvGEEfg7X6iSTMb6jukumKkVo",
    authDomain: "thirota-hello-react.firebaseapp.com",
    projectId: "thirota-hello-react",
    storageBucket: "thirota-hello-react.appspot.com",
    messagingSenderId: "748893185985",
    appId: "1:748893185985:web:f592b00c26247ca5437140"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}