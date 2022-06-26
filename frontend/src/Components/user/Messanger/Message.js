import React from "react";
import "./Message.css";
import { format } from "timeago.js";

const Message = ({ message, own, ownImage }) => {
  // console.log(own, "own");
  // console.log(message, "message");
  return (
    
    //    <div className={own ? "message own" : "message"}>
    //    <div className="messageTop">
    //      {own ? (
    //        <img src={ownImage} alt="img" className="messageImg" />
    //      ) : (
    //        <img
    //         src={message.sender.avatar.url}
    //         alt="receiverimg"
    //          className="messageImg"
    //        ></img>
    //      )}
    //     <p className="messageText">{message && message.text}</p>
    //    </div>
    //    <div className="messageBottom">{format(message.createdAt)}</div>
    //  </div> 

    //    {own ? (
    //     <div className="message own">
    //       <div className="messageTop">
    //         <img src={ownImage} alt="img" className="messageImg" />
    //         <p className="messageText">{message && message.text}</p>
    //       </div>
    //       <div className="messageBottom">{format(message.createdAt)}</div>
    //     </div>
    //   ) : (
    //     <div className="message">
    //       <div className="messageTop">
    //         <img
    //           src={message.sender.avatar.url}
    //           alt="img"
    //           className="messageImg"
    //         />
    //         <p className="messageText">{message && message.text}</p>
    //       </div>
    //       <div className="messageBottom">{format(message.createdAt)}</div>
    //     </div>
    //   )} 
      <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={message?.sender.avatar.url} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
    
  );
};

export default Message;
