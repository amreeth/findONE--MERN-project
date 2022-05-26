import axios from "axios";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Verify() {
  const { id, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    if (id && token) {
      let { data } = await axios.get(`/api/users/verify/${id}/${token}`);

      if (data.status) {
        alert(
          "Your Email has verified ,Please click the continue button to go Home page "
        );
      } else {
        navigate("/register");
      }
    }
  };

  return (
    <>
      <Container>
        <h1>Please click the continue button to go Home page</h1>
        <Button className="btn btn-success">
          <Link to="/" style={{ textDecoration: 'none' }}>Continue</Link>
        </Button>
      </Container>
    </>
  );
}

export default Verify;
