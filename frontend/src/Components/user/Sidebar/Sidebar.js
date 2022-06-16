import React from "react";
import "./sidebar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import Avatar from "@mui/material/Avatar";
const Sidebar = () => {
  let {
    userLogin: { userInfo },
  } = useSelector((state) => state);

  return (
    
    <div className="sidebarclass">
      <Container>
        <Row className="mt-4  mx-auto ">
          <Col className="mx-auto" lg={12}>
            <Avatar
            className="mx-auto"
              alt="Cindy Baker"
              // sx={{ width: 60, height: 60 }}
              src={userInfo && userInfo ? userInfo.avatar.url : ""}
            />
          </Col>

          <Col className="" lg={12}>
            <Link to="/profile" className="text-center text-white text-uppercase text-bold" style={{ textDecoration: "none" }}>
              <Typography  color="black" variant="h5">{userInfo && userInfo.name}</Typography>
            </Link>
          </Col>
        </Row>

        <Row className="mt-4">
          <Link
            to="/friends"
            className="d-flex"
            style={{ textDecoration: "none" }}
          >
            <PeopleRoundedIcon />
            <Typography variant="h5">Friends</Typography>
          </Link>
        </Row>

        <Row className="mt-4">
          <Link to="/allrequests" style={{ textDecoration: "none" }}>
            <Typography variant="h5">Requests</Typography>
          </Link>
        </Row>

        <Row className="mt-4">
          <Link to="/messanger" style={{ textDecoration: "none" }}>
            <Typography variant="h5">Message</Typography>
          </Link>
        </Row>

        <Row className="mt-4">
          <Link to="/notifications" style={{ textDecoration: "none" }}>
            <Typography variant="h5">Notifiaction</Typography>
          </Link>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
