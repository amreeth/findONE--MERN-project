import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../Components/user/Footer/Footer";
import Header from "../../Components/user/Header/Header";
import Sidebar from "../../Components/user/Sidebar/Sidebar";
import Friends from "../../Components/user/Friends/Friends";

const FriendsScreen = () => {
  return (
    <>
      <Header />
      <Container fluid style={{ minHeight: "62.5vh" }}>
        <Row>
          <Col
            lg={2}
            className="border shadow bg-light my-2 py-3 mx-auto"
            style={{ borderRadius: "10px" }}>
            <Sidebar />
          </Col>
          <Col lg={9} >
            <div className='d-flex'>
            <Friends/>
            </div>
          </Col>
        </Row>
      </Container>
      
      <Footer />

     
    </>
  );
};

export default FriendsScreen;
