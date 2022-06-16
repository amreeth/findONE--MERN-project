import React, { useEffect } from "react";
import Header from "../../Components/user/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../Components/user/Footer/Footer";
import Profile from "../../Components/user/UserDetails/Profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Changepassword from "../../Components/user/UserDetails/Changepassword";
import EditProfile from "../../Components/user/UserDetails/EditProfile";
import Moredetail from "../../Components/user/UserMoreDetails/Moredetail";

const ProfileScreen = () => {
  const navigate = useNavigate();

  let {
    userLogin: { userInfo },
  } = useSelector((state) => state);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Container style={{ minHeight: "62.5vh" }} fluid>
        <Row className="mt-3">
          <Col
            lg={3}
            sm={12}
            className="mx-auto"
            style={{ borderRadius: "10px" }}
          >
            <Profile />
          </Col>

          <Col
            lg={7}
            sm={12}
            className=" bg-white hover  shadow mx-auto"
            style={{
              borderRadius: "10px",
              backgroundImage:
                "url('https://prisminfoways.com/assets/images/shapes/banner-shape-1.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "80%",
            }}
          >
             <Moredetail/>
          </Col>
        </Row>


        <Row className="mt-2 mx-auto">
          <Col lg={3} sm={12} className='mx-auto d-flex'>
            <Changepassword />
            <EditProfile/>
          </Col>

          <Col lg={7} sm={12}>
           
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

export default ProfileScreen;
