import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase')
require('firebase/firestore')

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: '',
    authDomain: "plucky-tempo-258021.firebaseapp.com",
    databaseURL: "https://plucky-tempo-258021.firebaseio.com",
    projectId: "plucky-tempo-258021",
    storageBucket: "plucky-tempo-258021.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

ReactDOM.render(<App />, document.getElementById('evernote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
