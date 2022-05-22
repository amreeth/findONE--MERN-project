// import React, { useEffect, useState } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { Form, Row, Col, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../../Components/Message";
// import Loader from "../../Components/Loader";
// import FormContainer from "../../Components/user/FormContainer";
// import { registers } from "../../actions/userActions";

// const RegisterScreen = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [oppgender, setOppgender] = useState("");
//   const [phonenumber, setPhonenumber] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate=useNavigate()
//   const userRegister = useSelector((state) => state.userRegister);
//   const { loading, error, userInfo,success } = userRegister;

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/')
//     }
//   }, [navigate,userInfo]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     // Dispatch login

//     dispatch(
//       registers({ name, email, dob, gender, oppgender, phonenumber, password })
//     );

//     if(success){
//       navigate('/')
//     }
    
      
    
    
//   };

//   return (
//     <FormContainer>
//       <h2>Signup</h2>
//       {error && <Message variant="danger">{error}</Message>}
//       {loading && <Loader></Loader>}

//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="name"
//             placeholder="Enter your Name"
//             value={name}
//             required="true"
//             onChange={(e) => setName(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="email">
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="dob">
//           <Form.Label>Date of Birth</Form.Label>
//           <Form.Control
//             type="date"
//             placeholder="Enter your date of birth"
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="gender">
//           <Form.Label>I am</Form.Label>
//           <Form.Control
//             type="gender"
//             placeholder="Enter your gender"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//           ></Form.Control>

        

//         </Form.Group>

//         <Form.Group controlId="oppgender">
//           <Form.Label>Looking For</Form.Label>
//           <Form.Control
//             type="oppgender"
//             placeholder="opposite gender"
//             value={oppgender}
//             onChange={(e) => setOppgender(e.target.value)}
//           ></Form.Control>

         

//         </Form.Group>

//         <Form.Group controlId="phonenumber">
//           <Form.Label>Phonenumber</Form.Label>
//           <Form.Control
//             type="phonenumber"
//             placeholder="Enter your Phonenumber"
//             value={phonenumber}
//             onChange={(e) => setPhonenumber(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button type="submit" variant="primary">
//           Register
//         </Button>
//       </Form>
//       <Row className="py-3">
//         <Col>
//           Have an Account ?
//           <Link to="/login">Login</Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// };

// export default RegisterScreen;
