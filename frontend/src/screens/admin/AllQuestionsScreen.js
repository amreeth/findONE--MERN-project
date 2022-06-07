import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Row, Col, Container, Nav, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { allQuestions, editQuestion } from "../../actions/adminActions";
import Header from "../../Components/admin/Header";
import Sidebar from "../../Components/admin/Sidebar";
import { Button } from "@mui/material";
import { Modal } from "react-bootstrap";

const AllQuestionsScreen = () => {
  const dispatch = useDispatch();

  const {
    adminAllQuestions: { loading, error, questions },
  } = useSelector((state) => state);

  const {
    editQuestion: { loadingg, errorr, edited, success },
  } = useSelector((state) => state);

  console.log(edited, "dasdadd");

  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const [edit, setEdit] = useState("");

  const clickHandler = async (id) => {
    try {
      let adminInfo = await localStorage.getItem("adminInfo");
      adminInfo = JSON.parse(adminInfo);
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };
      await axios.delete(`/admin/question/${id}`, config);

      setRefresh(!refresh);
    } catch (error) {
      throw new error(error.response.data.message);
    }
  };

  const handleShow = async (id) => {
    setShow(true);
    const editQuestion = questions.filter((e) => {
      if (e._id === id) {
        return e;
      }
    });
    setEdit(editQuestion[0]);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const id = edit._id;
    dispatch(
      editQuestion({ id, question, option1, option2, option3, option4 })
    );
  };

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      dispatch(allQuestions());
    } else {
      navigate("/admin");
    }
  }, [dispatch, refresh, edited]);

  return (
    <>
      <Header />
      <Container fluid className="mt-2">
        <Row>
          <Col lg={2} className="border mx-auto">
            <Sidebar />
          </Col>

          <Col lg={9} className="border mx-auto">
            <div className="mt-2">
              <LinkContainer to="/admin/addquestion">
                <Button>Add question</Button>
              </LinkContainer>
            </div>

            <h1>All Questions</h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Option1</th>
                    <th>Option2</th>
                    <th>Option3</th>
                    <th>Option4</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {questions &&
                    questions.map((quest) => (
                      <tr key={quest._id}>
                        <td>{quest.question}</td>
                        <td>{quest.option1}</td>
                        <td>{quest.option2}</td>
                        <td>{quest.option3}</td>
                        <td>{quest.option4}</td>
                        <td>
                          <Button
                            className="px-3"
                            onClick={() => handleShow(quest._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="px-3 buttons2"
                            onClick={() => {
                              clickHandler(quest._id);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        {errorr && <Message variant="danger">{errorr}</Message>}
        {loadingg && <Loader></Loader>}
        {success && <Message varinat="success">{edited.message}</Message>}
        <Modal.Body>
          <Form onSubmit={editHandler}>
            <Form.Group controlId="text">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder={edit.question}
                required="true"
                onChange={(e) => setQuestion(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="text">
              <Form.Label>Option 1</Form.Label>
              <Form.Control
                type="text"
                placeholder={edit.option1}
                required="true"
                onChange={(e) => setOption1(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="text">
              <Form.Label>Option 2</Form.Label>
              <Form.Control
                type="text"
                placeholder={edit.option2}
                required="true"
                onChange={(e) => setOption2(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="text">
              <Form.Label>Option 3</Form.Label>
              <Form.Control
                type="text"
                placeholder={edit.option3}
                required="true"
                onChange={(e) => setOption3(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="text">
              <Form.Label>Option 4</Form.Label>
              <Form.Control
                type="text"
                placeholder={edit.option4}
                required="true"
                onChange={(e) => setOption4(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AllQuestionsScreen;
