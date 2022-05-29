import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import Footer from '../../Components/user/Footer/Footer'
import Header from '../../Components/user/Header/Header'
import Sidebar from '../../Components/user/Sidebar/Sidebar'
import AllReceivedRequest from '../../Components/user/AllReceivedRequest/AllReceivedRequest'

const AllReceivedRequestScreen = () => {
  return (
    <>
     <Header/>
    <Container fluid>
        <Row className='mt-3'>
        <Col lg={2}
            className=" border shadow mx-auto"
            style={{ borderRadius: "10px" }}>
            <Sidebar/>
          </Col>
          <Col lg={9} sm={12} className='mx-auto'>
              <Row className='mt-4'>
                <AllReceivedRequest/>
              </Row>
          </Col>
        </Row>
    </Container>
    <Container fluid>
        <Row className="mt-5">
          <Footer/>
        </Row>
      </Container>
    </>
  )
}

export default AllReceivedRequestScreen