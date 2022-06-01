import React, { useEffect } from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  let {
    userLogin: { userInfo },
  } = useSelector((state) => state);

  console.log(userInfo);


  return (
    <>
      <Row className=" rounded shadow  bg-light " style={{minHeight:"30rem",backgroundImage:"url('https://www.pngkey.com/png/full/336-3369684_home-web-design-education-website-background.png')",backgroundRepeat:"no-repeat",backgroundSize:"250%"}}>
        <Col className="mx-auto rounded  p-3" lg={12}>
          <img src={userInfo ? userInfo.avatar.url : ""}  width={"100%"}  style={{ borderRadius: "50%"}}></img>
        </Col>
        <Col lg={12} className="my-3" style={{ borderRadius:"15px",}}>
          <div className="d-flex justify-content-between py-1 px-3">
          <Typography className="text-muted text-uppercase py-1" variant="h5">{userInfo.name}</Typography>
          <Typography variant="h5">{userInfo.dob}</Typography>
          </div>
          <div className="px-3"><Typography >{userInfo.email}</Typography></div>
          
          
          <div className="text-end px-3 py-1 text-muted"> <Typography >{userInfo.phonenumber}</Typography></div>
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};

export default Profile;
