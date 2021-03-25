import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore'
import 'firebase/storage'


var firebaseConfig = {
  apiKey: "AIzaSyBjxeBwvRx4N0MzhG9xl4jHoQ02sK0kt-M",
  authDomain: "thunder-mall-13cf5.firebaseapp.com",
  projectId: "thunder-mall-13cf5",
  storageBucket: "thunder-mall-13cf5.appspot.com",
  messagingSenderId: "423015951227",
  appId: "1:423015951227:web:8d581cf32daf15ba062bde",
  measurementId: "G-6YJLCM7SW3"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire
