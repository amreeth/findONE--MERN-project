import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'
import FormContainer from '../../Components/user/FormContainer'
import { login } from '../../actions/userActions'


const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [navigate, userInfo])


    const submitHandler = (e) => {
        e.preventDefault()
        //Dispatch login
        dispatch(login(email, password))

    }

    return (
        <FormContainer>
            <h2>Login</h2>
            {error && <Message variant='danger' >{error}</Message>}
            {loading && <Loader></Loader>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email'
                        placeholder='Enter Email'
                        
                        required="true"
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                        placeholder='Enter password'
                        value={password}
                        required="true"
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Login</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New User ?
                    <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen