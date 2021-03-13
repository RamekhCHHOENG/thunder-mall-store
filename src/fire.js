import firebase from "firebase/app";
import "firebase/auth";


var firebaseConfig = {
  apiKey: "AIzaSyC2EDX2JZRlrwYAWYIrUsN0QUIKI3528M4",
  authDomain: "thunder-mall-store.firebaseapp.com",
  projectId: "thunder-mall-store",
  storageBucket: "thunder-mall-store.appspot.com",
  messagingSenderId: "668878051173",
  appId: "1:668878051173:web:9712f1507dffbfcfa3b38c",
  measurementId: "G-EEB4ZDJ6HM"
}; 

const fire = firebase.initializeApp(firebaseConfig);
export default fire
