import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';

const Footer = () => {
  return (
   <footer className='footer'>
      <Container fluid>
        <Row>
          <Col lg={4} className='bg-primary '>
            <p>helloo</p>
          </Col>
          <Col lg={4} className='bg-danger '>
          Copyright &copy; FindOne
          </Col>
          <Col lg={4} className='bg-warning '>
           <h5>Follow Us</h5>
          
          </Col>
        </Row>  
      </Container>
   </footer>
  )
}

export default Footer