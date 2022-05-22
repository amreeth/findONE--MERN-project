import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import FormContainer from "../../Components/user/FormContainer";
import { addQuestion } from "../../actions/adminActions";
import Header from "../../Components/admin/Header";
import Sidebar from "../../Components/admin/Sidebar";

const AddQuestionScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const adminAddQuestion = useSelector((state) => state.adminAddQuestion);

  const { loading, error, adminInfo,success } = adminAddQuestion;

console.log(adminInfo);

  useEffect(() => {
    let admin = localStorage.getItem("adminInfo");
    admin = JSON.parse(admin)
    
    if (!admin) {
      navigate("/admin");
    }  
  }, [navigate, adminInfo]);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addQuestion({question,option1,option2,option3,option4}))

    if(success){
      navigate('/admin/allquestions')
    }
}

  return (
    <>
      <Header />
      <Container fluid className="mt-2">
        <Row>
          <Col lg={2} className="border mx-auto">
            <Sidebar />
          </Col>
          <Col lg={9} className="border mx-auto">

          {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Question Added</Message>}
            {loading && <Loader />}

            <h1>Add Question</h1>
    
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="text">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the question"
                    required="true"
                    onChange={(e) => setQuestion(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="text">
                  <Form.Label>Option 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the first option"
                    required="true"
                    onChange={(e) => setOption1(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="text">
                  <Form.Label>Option 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the second option"
                    required="true"
                    onChange={(e) => setOption2(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="text">
                  <Form.Label>Option 3</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the third option"
                    required="true"
                    onChange={(e) => setOption3(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="text">
                  <Form.Label>Option 4</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the fourth option"
                    required="true"
                    onChange={(e) => setOption4(e.target.value)}
                  ></Form.Control>
                </Form.Group>

              
                <Button type="submit" variant="primary">Submit
                </Button>
              </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddQuestionScreen;
