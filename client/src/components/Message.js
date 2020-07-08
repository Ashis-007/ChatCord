import React from "react";
import "../css/Message.css";

const Message = ({ msg, isReceived }) => {
  return (
    <div className={`Message ${isReceived ? "received" : "sent"}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
