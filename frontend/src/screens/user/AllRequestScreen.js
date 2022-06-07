import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../Components/user/Footer/Footer";
import Header from "../../Components/user/Header/Header";
import Sidebar from "../../Components/user/Sidebar/Sidebar";
import Allsentrequest from "../../Components/user/AllSentRequest/Allsentrequest";
import AllReceivedRequest from "../../Components/user/AllReceivedRequest/AllReceivedRequest";

const AllRequestScreen = () => {
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
            <Sidebar />
          </Col>

          <Col lg={9} className=" mx-auto">
            <Container>
              <Row>
                <Col lg={5} sm={12}>
                  <h4>All Received Request</h4>
                  <Row className="mt-4">
                    <AllReceivedRequest />
                  </Row>
                </Col>

                <Col lg={5} sm={12}>
                  <h4>All Sent Requests</h4>
                  <Row className="mt-4">
                    <Allsentrequest />
                  </Row>
                </Col>
                
              </Row>
            </Container>
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

export default AllRequestScreen;
