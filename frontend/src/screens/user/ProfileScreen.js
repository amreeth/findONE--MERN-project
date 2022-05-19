import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import FormContainer from "../../Components/user/FormContainer";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/user/Header/Header";
import Footer from "../../Components/user/Footer/Footer";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [oppgender, setOppgender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  // console.log(userDetails,'userdetails');

  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (userInfo) {
      if (!user) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    } else {
      navigate("/login");
    }
  }, [userInfo, dispatch, user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch update profile
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={6}>
            <h2>User profile</h2>
            {/* {message& <Message variant='danger'>{message}</Message>} */}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile updated</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="dob"
                  placeholder="Enter your date of birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="gender">
                <Form.Label>I am</Form.Label>
                <Form.Control
                  type="gender"
                  placeholder="Enter your gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="oppgender">
                <Form.Label>Looking For</Form.Label>
                <Form.Control
                  type="oppgender"
                  placeholder="opposite gender"
                  value={oppgender}
                  onChange={(e) => setOppgender(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="phonenumber">
                <Form.Label>Phonenumber</Form.Label>
                <Form.Control
                  type="phonenumber"
                  placeholder="Enter your Phonenumber"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
        <Footer />
      </Container>
    </>
  );
};

export default ProfileScreen;
