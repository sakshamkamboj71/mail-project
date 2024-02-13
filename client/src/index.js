import firebase from "firebase/compat/app";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

//Add your firebase config here.

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
