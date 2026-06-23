// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCZYJsR0m-lW68kqdpgyiLyU5RrYkNJszQ',
  authDomain: 'amichiiapp.firebaseapp.com',
  projectId: 'amichiiapp',
  storageBucket: 'amichiiapp.firebasestorage.app',
  messagingSenderId: '804008492208',
  appId: '1:804008492208:web:45b4d2f61a92e3b385cf75',
  measurementId: 'G-E1CCXWQRFL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
