import React, { useEffect, useContext } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";
import Routes from "./Routes";
import Context from "./context/Context";

// initialize firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useContext(Context);
  const [isAuthenticated, setIsAuthenticated] = useContext(Context);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({ uid: currentUser.uid });
        setIsAuthenticated(true);
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
