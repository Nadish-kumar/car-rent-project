import firebase from "firebase";


    const firebaseConfig = {
        apiKey: "AIzaSyCzULPCTyeCNtb0SMWgcOI2xlQsxIwDqVw",
        authDomain: "rent-car-cfa36.firebaseapp.com",
        projectId: "rent-car-cfa36",
        storageBucket: "rent-car-cfa36.appspot.com",
        messagingSenderId: "140895043349",
        appId: "1:140895043349:web:014ceb1b3375c3684f331c"
      };


      firebase.initializeApp(firebaseConfig);
      var auth = firebase.auth();
      export { auth, firebase };
