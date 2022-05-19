import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { listUsers } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import Header from "../../Components/admin/Header";
import Sidebar from "../../Components/admin/Sidebar";

const UserManagement = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const navigate = useNavigate();

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");

    if (adminInfo) {
      dispatch(listUsers());
    } else {
      navigate("/admin");
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container fluid className="mt-2">
        <Row>
          <Col lg={2} className="border mx-auto">
            <Sidebar />
          </Col>
          <Col lg={9} className="border mx-auto">
            <h1>Users</h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {
                            <Switch
                              {...label}
                              defaultChecked={user.isblocked}
                              onChange={(e) => {
                                alert(e.target.checked);
                              }}
                            />
                          }
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

export default UserManagement;
