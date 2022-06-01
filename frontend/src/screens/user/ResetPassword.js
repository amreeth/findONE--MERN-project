import React, { useState } from "react";
import "./ResetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/userActions";
import { useParams,Link } from "react-router-dom";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const params = useParams();

  console.log(params.token);
  let token = params.token;

  const dispatch = useDispatch();

  const resetPassword = useSelector((state) => state.resetpassword);

  const { loading, error, message } = resetPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password }));
  };

  return (
    <div className="resetPassword">
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="success">{message.message}</Message>}
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h4" style={{ padding: "2vamx" }}>
          Reset Password
        </Typography>

        <input
          type="password"
          placeholder="Enter the password"
          required
          className="resetPasswordInputs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

         <Link to='/forgotpassword'>
          <Typography>Resend Mail</Typography>
      </Link>

        <Button type="submit">Reset Password</Button>
      </form>

     
    </div>
  );
};

export default ResetPassword;
