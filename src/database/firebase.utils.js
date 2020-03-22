import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyDSnWBiGaw_N9qIidXpu75PSeoTeooVyPU',
    authDomain: 'crwn-db-f35ac.firebaseapp.com',
    databaseURL: 'https://crwn-db-f35ac.firebaseio.com',
    projectId: 'crwn-db-f35ac',
    storageBucket: 'crwn-db-f35ac.appspot.com',
    messagingSenderId: '61932584215',
    appId: '1:61932584215:web:c9def7197def53646fcb52',
    measurementId: 'G-RZ4T6ZSGCH'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
