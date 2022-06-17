import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../Components/user/Footer/Footer";
import Header from "../../Components/user/Header/Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/user/Sidebar/Sidebar";
import Card from "../../Components/user/Card/Card";
import "./HomeScreen.css";

const HomeScreen = () => {
  const [user, setUser] = useState("user");
  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const info = JSON.parse(userInfo);

    setUser(info ? info.name : "user");

    if (info) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row d-flex justify-content-between">
          <div
            className="col-3 col-lg-3 col-md-2 "
            style={{
              borderRadius: "10px",
              backgroundColor: "white",
              width: "16rem",
            }}
          >
            <Sidebar />
          </div>
          <div className="col-9 d-flex col-lg-9 col-md-10">
            <Card />
          </div>
        </div>
        <Footer  className="pt-5"/>
      </div>

      {/* <Container fluid>
        <Row className="mt-3">
          <Col 
            lg={2} xs={1} sm={2}
            className=" border 5px shadow mx-auto"
            style={{ borderRadius: "10px" , backgroundColor:"white" , width:"17rem"}}
          >
            <Sidebar/>
          </Col>

          <Col lg={9} sm={9} className=" mx-auto">
            <Row>       
                <Card />
            </Row>   
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="mt-5">
          <Footer />
        </Row>
      </Container> */}
    </>
  );
};

export default HomeScreen;
