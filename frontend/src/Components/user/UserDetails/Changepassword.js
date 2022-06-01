import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword } from "../../../actions/userActions";
import {Form, Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import Message from "../../Message";

const Changepassword = () => {
  const dispatch = useDispatch();

  const changepassword = useSelector((state) => state.updatePassword);
  const { loading, error, success, user } = changepassword;

  const [show, setShow] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log(oldPassword, newPassword, confirmPassword);
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));

    // console.log(success);

    if (success) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Change Password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">{user.message}</Message>}
          <Form onSubmit={handleChangePassword}>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                value={oldPassword}
                required="true"
                onChange={(e) => setOldPassword(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                requierd="true"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required="true"
              />
            </Form.Group>
            <Button type="submit" variant="success">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Changepassword;
