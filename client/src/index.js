import firebase from "firebase/compat/app";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyDLI3SPU7tpY3ll_yVmQzExUov-5R09DEg",
  authDomain: "mail-adf4c.firebaseapp.com",
  projectId: "mail-adf4c",
  storageBucket: "mail-adf4c.appspot.com",
  messagingSenderId: "249780914377",
  appId: "1:249780914377:web:acc3f7dd7c909987202518",
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
