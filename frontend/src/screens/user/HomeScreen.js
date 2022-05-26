import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Footer from "../../Components/user/Footer/Footer";
import Header from "../../Components/user/Header/Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/user/Sidebar/Sidebar";
import Card from "../../Components/user/Card/Card";
import "./HomeScreen.css";
import Matches from "../../Components/user/Matches/Matches";

const HomeScreen = () => {
  const [matches, setMatches] = useState();
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState("user");
  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const info = JSON.parse(userInfo);

    // console.log(info,'ingooo');

    setUser(info ? info.name : "user");

    if (userInfo) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Container fluid>
        <Row className="mt-3">
          <Col
            lg={2}
            className=" border shadow mx-auto"
            style={{ borderRadius: "10px" }}
          >
            <Sidebar name={user.name} email={user.email} />
          </Col>

          <Col lg={9} sm={12} className=" mx-auto">

            <Row className="mt-4 ">       
                <Card />
            </Row>   
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="mt-5">
          <Footer />
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
