import React from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar,Nav,Container,Form,FormControl,Button,Row,Col} from "react-bootstrap";

const Sidebar = ({name,email}) => {
  return (
    <div className='' >
      <Container>
          <Row className='mt-4'>
          <LinkContainer to="/profile">
                <Nav.Link>
                  {name}<i className="fa fa-user" aria-hidden="true"></i>
                </Nav.Link>
              </LinkContainer>
          </Row>
          <Row className='mt-4'>
          <LinkContainer to="/matches">
                <Nav.Link>Matches</Nav.Link>
              </LinkContainer>

          </Row>
          <Row className='mt-4'>
          <LinkContainer to="/Requests">
                <Nav.Link>Requests</Nav.Link>
              </LinkContainer>

          </Row>
          <Row className='mt-4'>
          <LinkContainer to="/messages">
                <Nav.Link>Messages</Nav.Link>
              </LinkContainer>
          </Row>
          <Row className='mt-4'>
          <LinkContainer to="/notifications">
                <Nav.Link>Notification</Nav.Link>
              </LinkContainer>
          </Row>
      </Container>

    </div>
  )
}

export default Sidebar