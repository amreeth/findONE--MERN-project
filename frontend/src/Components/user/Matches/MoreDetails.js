import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Typography } from "@mui/material";

const MoreDetails = () => {
  return (
    <>
      <Row>
        <Col lg={4} col={4}>
          <div className="bg-danger">
            <h1>s</h1>
          </div>
        </Col>
        <Col lg={4} col={4}>
          <div className="bg-warning">
            <h1>sddd</h1>
          </div>
        </Col>
        <Col lg={4} col={4}>
          <div className="bg-primary">
            <h1>dddddd</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={4} col={4}>
          <Typography variant="h6">Height</Typography>
        </Col>
        <Col lg={4} col={4}>
          <Typography variant="h6">Weight</Typography>
        </Col>
        <Col lg={4} col={4}>
          <Typography variant="h6">Job</Typography>
        </Col>
      </Row>
      <Row>
        
      </Row>
    </>
  );
};

export default MoreDetails;
