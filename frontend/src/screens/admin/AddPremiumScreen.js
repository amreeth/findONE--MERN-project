import React, { useEffect, useState } from 'react'
import {Form,Row,Col,Container} from 'react-bootstrap'
import Sidebar from '../../Components/admin/Sidebar'
import Header from '../../Components/admin/Header'
import { addPremium } from '../../actions/adminActions' 
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Button} from '@mui/material'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'

const AddPremiumScreen = () => {
const dispatch=useDispatch()
const navigate=useNavigate()

const [category,setCategory]=useState("")
const [name,setName]=useState("")
const [price, setPrice] = useState("")
const [days,setDays]=useState("")

const addpremium=useSelector((state)=>state.addPremium)
const {loading,error,success,adminInfo}=addpremium

console.log(addpremium,'addddddd preeeemiii');

useEffect(() => {
 let admin=localStorage.getItem('adminInfo')
 admin=JSON.parse(admin)

 if(!admin){
     navigate('/admin')
 }
}, [navigate,adminInfo])


const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(addPremium({name,category,price,days}))

    if(success){
        navigate('/admin/allpremiumlist')
    }
}

  return (
   <>
   <Header/>
   <Container fluid className='mt-2'>
       <Row>
       <Col lg={2} className="border mx-auto">
            <Sidebar />
          </Col>
          <Col lg={9} className="border mx-auto">

          {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Premium category added</Message>}
            {loading && <Loader />}

            <h1>Add Premium Category</h1>
    
              <Form onSubmit={submitHandler}>
              <Form.Group controlId="text">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ente the name premium"
                    required="true"
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="text">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ente the category name"
                    required="true"
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="text">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    required="true"
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="text">
                  <Form.Label>No.of Days</Form.Label>
                  <Form.Control
                    type="Number"
                    required="true"
                    onChange={(e) => setDays(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Submit
                </Button>
              </Form>
          </Col>

       </Row>
   </Container>
   </>
  )
}

export default AddPremiumScreen