import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/user/Header/Header";
import { Container } from "react-bootstrap";
import Conversation from "../../Components/user/Messanger/Conversation";
import "./MessangerScreen.css";
import Message from "../../Components/user/Messanger/Message";
import ChatOnline from "../../Components/user/Messanger/ChatOnline";
import axios from "../../utils/axios";
import { io } from "socket.io-client";
import Footer from "../../Components/user/Footer/Footer";

const MessangerScreen = () => {
  const [conversations, setCoversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef(io("https://amreeth.online"));
  const scrollRef = useRef();

  let user = localStorage.getItem("userInfo");
  user = JSON.parse(user);
  let image = user.avatar.url;

  useEffect(() => {
    socket.current = io("https://amreeth.online");
    socket.current.on("getMessage", (data) => {
      setArivalMessage({
        sender: data.sender,
        text: data.text,
        creatAt: Date.now(),
      });
    });
    return () => {
      socket.current.close();
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender._id) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      users = JSON.parse(users);
      setOnlineUsers(
        user.friends.filter((f) => users.some((u) => u.userId === f._id))
      );
    });
  }, [user.friends, user._id]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const { data } = await axios.get(`/conversation/${user._id}`);
        setCoversations(data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(`/message/${currentChat?._id}`);
        setMessages(data);
      } catch (error) {
        // console.log(error, "error from getMessage");
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: {
        avatar: user.avatar,
        _id: user._id,
      },
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const { data } = await axios.post("/message", message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Header />
      <Container>
        <div className="messanger">
          {/* <div className="chatMenu">
            <div className="chatMenuWrapper">
              <Typography variant="h5">Recent Chat</Typography>
              {conversations.map((cov) => (
                <div onClick={() => setCurrentChat(cov)}>
                  <Conversation conversation={cov} currentUser={user} />
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((msg) => (
                      <div ref={scrollRef}>
                        <Message
                          message={msg}
                          own={msg.sender === user._id}
                          ownImage={image}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something.."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    {newMessage.length < 1 ? (
                      <button className="chatSubmitButtonNo">Send</button>
                    ) : (
                      <button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat
                </span>
              )}
            </div>
          </div> */}

          <div className="chatBox col-sm-8">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div key={m._id} ref={scrollRef}>
                        <Message message={m} own={m.sender._id === user._id} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      onKeyPress={(e)=>e.key==='Enter'&&handleSubmit}
                    ></textarea>

                    {newMessage.length < 1 ? (
                      <button className="chatSubmitButtonNo">Send</button>
                    ) : (
                      <button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p className="noConversationText">
                    Open a conversation to start a chat.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <ChatOnline
                onlineUsers={onlineUsers && onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
              />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default MessangerScreen;
