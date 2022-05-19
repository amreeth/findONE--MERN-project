import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'
import {Container,Row,Col} from 'react-bootstrap'
import Sidebar from '../../Components/admin/Sidebar' 
import Header from '../../Components/admin/Header'

const AdminHomeScreen = () => {
    const navigate = useNavigate()
    // const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const adminInfo = localStorage.getItem("adminInfo")
        
        if (adminInfo) {
            navigate('/admin')
        } else {
            navigate('/admin/login')
        }
    }, [])
  return (

    <div className='admin'>
      <Header/>
      <Container fluid className='mt-2'>
        <Row>
          <Col lg={2} className='border mx-auto'>
            <Sidebar/>
          </Col>
          <Col lg={9} className='border mx-auto'>
            admin home
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminHomeScreen