import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'
import Sidebar from '../../Components/admin/Sidebar' 
import Header from '../../Components/admin/Header'
import Profit from '../../Components/admin/Home/Profit'

const AdminHomeScreen = () => {
    const navigate = useNavigate()

    useEffect(() => {
        let adminInfo = localStorage.getItem("adminInfo")
        adminInfo=JSON.parse(adminInfo)
    
        if (adminInfo) {
            navigate('/admin')
        } else {
            navigate('/admin/login')
        }
    }, [])


  return (

    <div className='admin'>
      <Header/>
      <div className='container-fluid'>
        <div className='row d-flex mt-4'>
          <div className='col-lg-2 border mx-auto'>
            <Sidebar/>
          </div>
          <div className='col-lg-9  border mx-auto'>
            <Profit/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminHomeScreen