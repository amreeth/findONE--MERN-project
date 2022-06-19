import React, { useEffect, useState } from "react";
import "./Conversation.css";
import axios from '../../../utils/axios'

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  console.log(conversation,'conversation');
  console.log(currentUser,'cuurent user');

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    // console.log(friendId,'sssss');

    const getUser=async()=>{
      try {
        const {data}=await axios.get('/users/getUsersRecent?userId='+friendId)
        // console.log(data,'data');
        setUser(data)
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [conversation,currentUser]);

  return (
    <>
      <div className="conversation">
        <img className="conversationImg" src={user&&user.avatar.url} alt="Img" />
        <span className="conversationName">{user&&user.name}</span>
      </div>
    </>
  );
};

export default Conversation;
