import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/functions'
let firebaseConfig = {
    apiKey: "AIzaSyDttTOeqwWfTFCGtmrnrbeu7J6E_gT48Jk",
    authDomain: "spoco-bdf02.firebaseapp.com",
    projectId: "spoco-bdf02",
    storageBucket: "spoco-bdf02.appspot.com",
    messagingSenderId: "249005903341",
    appId: "1:249005903341:web:02235655d460a3576bebe4",
    measurementId: "G-GZBKGZ5DYX"
  };
const app=firebase.initializeApp(firebaseConfig);
app.analytics();

export default app;
export const auth=app.auth();
export const db=app.firestore();
export const functions=app.functions();