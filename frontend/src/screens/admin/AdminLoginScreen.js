import React, { useState, useEffect, Fragment } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Message from '../../Components/Message';
import './Admin.css'
import { Button, Container, Form, Row } from 'react-bootstrap';
import FormContainer from '../../Components/user/FormContainer';



const AdminLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        const adminInfo = localStorage.getItem("adminInfo")
        if (adminInfo) {
            navigate('/admin/')
        } else {
            navigate("/admin/login")
        }
    }, [navigate])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }

            const { data } = await axios.post("/api/admin/login", {
                email,
                password,
            }, config)
            
            console.log(data);
            localStorage.setItem("adminInfo", JSON.stringify(data))
            if (localStorage.adminInfo) {
                navigate('/admin')
            }

        } catch (error) {
            setError("Invalid Login")
        }
    }



    return (
        <FormContainer>
        <h2>Admin Login</h2>
        {error && <Message variant='danger' >{error}</Message>}
       

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Login</Button>
        </Form>
    </FormContainer>
    )
}

export default AdminLogin
