import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "./config/firebaseConfig";
import Routes from "./Routes";
import UserContext from "./context/UserContext";
import AuthContext from "./context/AuthContext";

// initialize firebase
firebase.initializeApp(firebaseConfig);

function App(props) {
  const [user, setUser] = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    // check if an user is already logged in
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        // TODO: fetch user from DB
        firebase
          .database()
          .ref("/users/" + uid)
          .once("value")
          .then((snapshot) => setUser(snapshot.val()))
          .catch((err) => console.log(err.message));
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
