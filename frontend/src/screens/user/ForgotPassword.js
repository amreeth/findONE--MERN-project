import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/userActions";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
 
  const forgotpassword = useSelector((state) => state.forgotPassword);
  const { loading, error, message } = forgotpassword;

    let success;

    if(message)
    {
      success=message.success
    }

  console.log(forgotpassword);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <div className="forgotPassword">
      {error && <Message variant="danger">{error}</Message>}
      {message&&<Message variant='success'>{message.message}</Message>}
      {loading && <Loader></Loader>}
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h4" style={{ padding: "2vamx" }}>
          Forgot Password
        </Typography>
        <input
          type="email"
          placeholder="Enter the email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <Button type="submit">Send Email</Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
