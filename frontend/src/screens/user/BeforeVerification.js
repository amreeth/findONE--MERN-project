import React from "react";
import { Container,Row } from "react-bootstrap";
import "./Before.css";
import Footer from "../../Components/user/Footer/Footer";

const BeforeVerification = () => {
  return (
    <>
      <div className="test">
        <Container>
          <Row className='p-4'>
          <h1 className="mt-2">Waiting for your Email verification</h1>
          <h2 className='mt-4'>Please check your Email . . . </h2>
          </Row>
          <Row>
            <div className="text-center">
              <img style={{width:"200px"}} src="https://cdn-icons-png.flaticon.com/512/561/561127.png"></img>
            </div>
          </Row>
        </Container>
      </div>
      <Container fluid>
        <Footer />
      </Container>
    </>
  );
};

export default BeforeVerification;
