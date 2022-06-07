import React from "react";
import { useParams } from "react-router-dom";
import Matches from "../../Components/user/Matches/Matches";
import MoreDetails from "../../Components/user/Matches/MoreDetails";
import Header from "../../Components/user/Header/Header";
import { Col, Container, Row } from "react-bootstrap";

const MactherScreen = () => {
  const params = useParams();
  const id=params.id

  return (
    <>
      <Header />
      <Container fluid>
        <Row className="mt-3">
          <Col
            lg={3}
            sm={12} 
            className="mx-auto"
            style={{ borderRadius: "10px" }}
            >
            <Matches id={id} />  
          </Col>

          <Col lg={8} sm={12} style={{ borderRadius: "10px" }} className=" bg-white hover shadow mx-auto">
            <MoreDetails/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MactherScreen;
