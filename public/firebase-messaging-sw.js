importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDVtIWzSb8QdTY5lRgYjIjLs8Hy1Tt0ZoY",
  authDomain: "todo-76a93.firebaseapp.com",
  projectId: "todo-76a93",
  storageBucket: "todo-76a93.appspot.com",
  messagingSenderId: "193259357261",
  appId: "1:193259357261:android:2826d5a6d0fc1e128f4804"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('📥 [firebase-messaging-sw.js] Background message received:', payload);
});
