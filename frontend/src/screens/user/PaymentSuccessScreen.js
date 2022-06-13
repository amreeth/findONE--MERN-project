import React from 'react'
import { useNavigate,Link} from 'react-router-dom'
import {Container,Row,Col} from 'react-bootstrap'
import {Typography} from '@mui/material'

const PaymentSuccessScreen = () => {
    const navigate=useNavigate()


  return (
    <>
    <Container>
        <Row>
            <Typography variant='h4'>Premium Purchase was successfull</Typography>
        </Row>
        <Row>
            <Link to='/'>Go to Home </Link>
        </Row>
    </Container>
    </>
  )
}

export default PaymentSuccessScreen