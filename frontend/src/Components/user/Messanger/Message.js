import React from "react";
import "./Message.css";
import {format} from 'timeago.js'

const Message = ({ message, own }) => {
  // console.log(own,'own');

  console.log(message,'message');

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="{message&&message.sender.avatar.url}" alt="img" className="messageImg" />
        <p className="messageText">
          {message&&message.text}
          </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
