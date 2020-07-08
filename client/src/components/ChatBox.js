import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Grid } from "@material-ui/core";
import socket from "../service/socket";
import Message from "./Message";

import "../css/ChatBox.css";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const textField = document.getElementById("textField");
    textField.addEventListener("keypress", () => {
      socket.emit("typing", "An user is typing ...");
    });

    // listen for msgs from server
    socket.on("message", (message) => {
      console.log(message);
      setAllMessages((msgs) => [...msgs, message]);
    });

    // listen for typing events
    socket.on("typing", (msg) => {
      // console.log(msg);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setAllMessages((msgs) => [...msgs, message]);
    setMessage("");
  };

  return (
    <div className="ChatBox">
      <div className="ChatBox__chat">
        {allMessages.map((message, index) => (
          <Message msg={message} key={index} />
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
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
