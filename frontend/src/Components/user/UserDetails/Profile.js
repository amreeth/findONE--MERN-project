import React, { useEffect } from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import axios from "../../../utils/axios";

const Profile = () => {
  const userInfo = localStorage.getItem("userInfo");
  console.log(userInfo);

  const id = userInfo._id;  
  console.log(id, "user id");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const userDetails = async () => {
    const { data } = await axios.get(`/users/${id}`, config);
  };

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <Container>
      <Row></Row>
      <Row></Row>
      <Row></Row>
    </Container>
  );
};

export default Profile;
