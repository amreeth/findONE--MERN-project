import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar,Nav,Container,Form,FormControl,Button} from "react-bootstrap";
import { logout } from "../../../actions/userActions";
import { useNavigate } from "react-router-dom";

function Header() {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const userLogin=useSelector((state)=>state.userLogin)
  const {userInfo} =userLogin

  const logoutHandler=()=>{
    // console.log('logout');
    navigate('/login')
    
    dispatch(logout())
  }

  return (
    
    <header>
      <Navbar  expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>FindOne</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll>
            </Nav>

            <Form className="d-flex ms-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"/>
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav
              className="me-auto my-2 my-lg-0"
              
              navbarScroll>
               
            </Nav>
          </Navbar.Collapse>
          <Nav>
          <Nav.Link onClick={logoutHandler} style={{fontVariant:'black'}}>
                  Logout<i className="fa fa-sign-out" aria-hidden="true"></i>
                </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
