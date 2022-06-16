import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Typography, Button } from "@mui/material";
import Header from "../../Components/user/Header/Header";
import Footer from "../../Components/user/Footer/Footer";

const PaymentSuccessScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container style={{ minHeight: "65vh" }}>
        <Row className="mt-2">
          <div className="text-center">
            <img
              style={{ width: "200px" }}
              src="http://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png"
            ></img>
          </div>
        </Row>

        <Row className="mt-2 text-center">
          <Typography variant="h4" style={{ color: "green" }}>
            Your payment was successful
          </Typography>

          <div className='mt-3'>
            <Button style={{backgroundColor:"green"}}>
              <Link to="/" style={{ textDecoration: "none", color: "black",fontSize:"2rem" }}>
                Go to Home
              </Link>
            </Button>
          </div>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentSuccessScreen;
