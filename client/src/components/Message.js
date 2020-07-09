import React from "react";
import "../css/Message.css";

const Message = ({ data, isReceived }) => {
  return (
    <div className={`Message ${isReceived ? "received" : "sent"}`}>
      <p>{data.author.username}</p>
      <p>{data.message}</p>
    </div>
  );
};

export default Message;
