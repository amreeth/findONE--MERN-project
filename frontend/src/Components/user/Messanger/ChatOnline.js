import React, { useEffect, useState } from "react";
import "./ChatOnline.css";
import axios from "../../../utils/axios";
import { Container, Row } from "react-bootstrap";
import { Typography } from "@mui/material";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      let userInfo = await localStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get("/users/friends", config);
      // console.log("getfriends", data);
      setFriends(data);
    };
    getFriends();
  }, []);


  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);


  const handleClick = async (user) => {
    try {
      console.log(currentId,user._id,'handleclcik');
      const { data } = await axios.get(`/conversation/find/${currentId}/${user._id}`);
  
      console.log(data, "dddddd");
      setCurrentChat(data);
      
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Typography variant="h5">Online Friends</Typography>
        {onlineFriends.length < 1 ? (
          <Typography style={{ color: "gray" }}>
            No friends are in online
          </Typography>
        ) : (
          <div className="chatOnline">
            {onlineFriends &&
              onlineFriends.map((onlineF) => (
                <div
                  className="chatOnlineFriend"
                  onClick={() => handleClick(onlineF)}
                >
                  <div className="chatOnlineImgContainer">
                    <img
                      className="chatOnlineImg"
                      src={onlineF.avatar.url}
                      alt="img"
                    />
                    <div className="chatOnlineBadge"></div>
                  </div>
                  <span className="chatOnlineName">{onlineF.name}</span>
                </div>
              ))}
          </div>
        )}
      </Row>

      <Row className="mt-2">
        <Typography variant="h5">Friends List</Typography>
        {friends.length < 1 ? (
          <Typography>You have no friends</Typography>
        ) : (
          <div className="">
            {friends &&
              friends.map((frnd) => (
                <div className="friends" onClick={() => handleClick(frnd)}>
                  <div className="friendsImgContainer">
                    <img
                      className="friendsImg"
                      src={frnd.avatar.url}
                      alt="img"
                    />
                  </div>
                  <span className="">{frnd.name}</span>
                </div>
              ))}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default ChatOnline;
