import React from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar,Nav,Container,Form,FormControl,Button,Row,Col} from "react-bootstrap";

const Sidebar = () => {
  return (
    <div>
        <Container>
          <Row className='mt-4'>
          <LinkContainer to="/admin">
                <Nav.Link>
                  Home
                </Nav.Link>
              </LinkContainer>
          </Row>
          <Row className='mt-4'>
          <LinkContainer to="/admin/usermanagement">
                <Nav.Link>All users</Nav.Link>
              </LinkContainer>

          </Row>
          <Row className='mt-4'>
          <LinkContainer to="/admin/allquestions">
                <Nav.Link>Questions</Nav.Link>
              </LinkContainer>

          </Row>
          <Row className='mt-4'>
          <LinkContainer to="/admin/allpremiumlist">
                <Nav.Link>Premium Category</Nav.Link>
              </LinkContainer>
          </Row>
          <Row className='mt-4'>
          <LinkContainer to="/admin/allpremiumusers">
                <Nav.Link>Premium Users</Nav.Link>
              </LinkContainer>
          </Row>
          <Row className='mt-4'>
          <LinkContainer to="">
                <Nav.Link>Report</Nav.Link>
              </LinkContainer>
          </Row>
      </Container>
    </div>
  )
}

export default Sidebar