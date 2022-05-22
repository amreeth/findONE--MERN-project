import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Row, Col, Button, Container, Nav, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { allQuestions } from "../../actions/adminActions";
import Header from "../../Components/admin/Header";
import Sidebar from "../../Components/admin/Sidebar";


const AllQuestionsScreen = () => {
  const dispatch = useDispatch();
  const {
    adminAllQuestions: { loading, error, questions },
  } = useSelector((state) => state);
  
  const [refresh, setRefresh] = useState(false)

  const navigate = useNavigate();

  const clickHandler = async (id) => {

    try {
      let adminInfo = await localStorage.getItem("adminInfo");
      adminInfo = JSON.parse(adminInfo);
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };
      await axios.delete(`/api/admin/question/${id}`, {
      }, config)
      setRefresh(!refresh)
    } catch (error) {
      throw new error(error.response.data.message)
    }

  };

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      dispatch(allQuestions());
    } else {
      navigate("/admin");
    }
  }, [dispatch,refresh]);

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
                            className="px-3 buttons2"
                            onClick={() => {
                              clickHandler(quest._id);
                            }}
                          >
                            <ion-icon name="trash-outline"></ion-icon>Delete
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
    </>
  );
};

export default AllQuestionsScreen;
