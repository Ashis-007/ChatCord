import React from "react";
import "../css/Message.css";

const Message = ({ data, isReceived, isTyping = false }) => {
  return (
    data.message && (
      <div
        className="Message"
        style={{ background: isReceived ? "#65c240" : "dodgerBlue" }}
      >
        <p className="Message__author">{isReceived && data.author.username}</p>
        <p className="Message__message">{data.message}</p>
        <p className="Message__time">{data.time}</p>
      </div>
    )
  );
};

export default Message;
