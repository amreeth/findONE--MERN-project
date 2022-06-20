import React from "react";
import "./sidebar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
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
              className="mx-auto user-card-avatar"
              alt="Cindy Baker"
              src={userInfo && userInfo ? userInfo.avatar.url : ""}
            />
          </Col>

          <Col className="" lg={12}>
            <Link
              to="/profile"
              className="text-center text-white text-uppercase text-bold"
              style={{ textDecoration: "none" }}
            >
              <p color="black" className="pt-3 side-bar-user-name">
                {userInfo && userInfo.name}
              </p>
            </Link>
          </Col>
        </Row>
        <hr style={{ color: "black" }} />
        <Row className="mt-4">
          <Link to="/friends" style={{ textDecoration: "none" }}>
            <p className="side-bar-texts">Friends</p>
          </Link>
        </Row>

        <Row className="mt-4">
          <Link to="/allrequests" style={{ textDecoration: "none" }}>
            <p className="side-bar-texts">Requests</p>
          </Link>
        </Row>

        <Row className="mt-4">
          
          {userInfo && userInfo.premium ? (
            <Link to="/messanger" style={{ textDecoration: "none" }}>
              <p className="side-bar-texts">Message</p>
            </Link>
          ) : (
            <Link to="/getpremium" style={{ textDecoration: "none" }}>
              <p className="side-bar-texts">Message</p>
            </Link>
          )}
        </Row>

        <Row className="mt-4">
          <Link to="" style={{ textDecoration: "none" }}>
            <p className="side-bar-texts">Notifiaction</p>
          </Link>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
