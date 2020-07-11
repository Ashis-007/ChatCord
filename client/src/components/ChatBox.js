import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import socket from "../service/socket";
import moment from "moment";
import Message from "./Message";

import "../css/ChatBox.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import UserContext from "../context/UserContext";
import AuthContext from "../context/AuthContext";

function ChatBox(props) {
  // Context
  const [user, setUser] = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);

  // State
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
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
        return <Redirect to="/chatcord" />;
      } else {
        return <Redirect to="/signin" />;
      }
    });
  }, []);

  useEffect(() => {
    const textField = document.getElementById("textField");
    const handler = () => {
      socket.emit("typing", "An user is typing ...");
    };
    textField.addEventListener("keypress", handler);

    // listen for msgs from server
    socket.on("message", (data) => {
      console.log(data);
      setAllMessages((msgs) => [...msgs, data]);
    });

    // listen for typing events
    socket.on("typing", (msg) => {
      // console.log(msg);
    });

    return () => {
      textField.removeEventListener("keypress", handler);
      socket.off("message");
      socket.off("typing");
      socket.disconnect();
      console.log("Socket Disconnected:", socket.disconnected);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message) {
      const day = moment().format("DD MMMM YYYY");
      const time = moment().format("h:mm a");
      const data = { message, day, time, author: user };
      socket.emit("message", data);
      setAllMessages((msgs) => [...msgs, data]);
      setMessage("");
    }
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser({});
        setIsAuthenticated(false);

        setMessage("");
        setAllMessages([]);

        props.history.push("/signin");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="ChatBox">
      <div className="ChatBox__chat">
        {allMessages.map((data, index) => (
          <Message
            data={data}
            key={index}
            isReceived={data.author.uid === user.uid ? false : true}
          />
        ))}
      </div>

      <div className="ChatBox__form">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            id="textField"
          />
          <Button type="submit" variant="contained" color="primary">
            <i className="fas fa-paper-plane"></i>
          </Button>
        </form>
      </div>
      <button className="btn signout" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default ChatBox;
