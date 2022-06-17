import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "../../actions/userActions";
import { useParams, Link, useNavigate } from "react-router-dom";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { useNaviagate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const params = useParams();

  const navigate = useNavigate();

  console.log(params.token);
  let token = params.token;

  const dispatch = useDispatch();

  const resetPassword = useSelector((state) => state.resetpassword);

  const { loading, error, message } = resetPassword;

  console.log(resetPassword);
  let success;

  if (message) {
    success = message.success;
    console.log(success);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAction({ token, password }));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [success]);

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
        <Link to="/forgotpassword">
          <Typography>Resend Mail</Typography>
        </Link>
        <Button type="submit">Reset Password</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
