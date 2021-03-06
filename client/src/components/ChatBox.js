import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import socket from "../service/socket";
import moment from "moment";
import Message from "./Message";

import "../css/ChatBox.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import UserContext from "../context/UserContext";

function ChatBox(props) {
  // Context
  const [user, setUser] = useContext(UserContext);

  // State
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    if (message !== "") {
      socket.emit("typing", `${user?.username} is typing...`);
    }
  }, [message]);

  useEffect(() => {
    if (user) {
      // listen for msgs from server
      socket.on("message", (data) => {
        console.log(data);
        setTyping(false);
        setAllMessages((msgs) => [...msgs, data]);
      });

      // listen for typing events
      socket.on("typing", (msg) => {
        setTyping(msg);
        console.log(msg);
      });

      // cleanup
      return () => {
        socket.off("message");
        socket.off("typing");
        socket.disconnect();
        console.log("Socket Disconnected:", socket.disconnected);

        setMessage("");
        setAllMessages([]);
      };
    }
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
        setMessage("");
        setAllMessages([]);

        props.history.push("/signin");
      })
      .catch((err) => console.log(err.message));
  };

  if (user) {
    return (
      <div className="ChatBox">
        <div className="ChatBox__info">{typing}</div>
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
              onChange={(e) => {
                setMessage(e.target.value);
                // emitTypingMessage(e);
              }}
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
  } else {
    return <Redirect to="/signin" />;
  }
}

export default ChatBox;
