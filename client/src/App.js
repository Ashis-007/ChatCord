import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "./config/firebaseConfig";
import Routes from "./Routes";
import Context from "./context/Context";

// initialize firebase
firebase.initializeApp(firebaseConfig);

function App(props) {
  const [user, setUser] = useContext(Context);
  const [isAuthenticated, setIsAuthenticated] = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    // check if an user is already logged in
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        setIsAuthenticated(true);
        // TODO: Redirect to chatbox
      }
    });
  }, []);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
