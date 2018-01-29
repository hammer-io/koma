/* eslint-disable import/no-unresolved */
import * as firebase from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';
import firebaseConfig from '../firebaseConfig.json';

console.log('Hello, World');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseUrl
});

const ref = firebase.database().ref('test');

const heartBeatRef = ref.child('heartbeats');
heartBeatRef.set({
  testApplication: {
    status: 'Green',
    timestamp: 'hello, world'
  }
});
