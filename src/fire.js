import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore'
import 'firebase/storage'


var firebaseConfig = {
  apiKey: "AIzaSyAuhAa8r3vhxWP6WNDI10aGAgmTAecEuK4",
  authDomain: "thunder-mall-2400e.firebaseapp.com",
  projectId: "thunder-mall-2400e",
  storageBucket: "thunder-mall-2400e.appspot.com",
  messagingSenderId: "1065083919072",
  appId: "1:1065083919072:web:95a648f7b8cddf7c088e85",
  measurementId: "G-412FY068TP"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire
