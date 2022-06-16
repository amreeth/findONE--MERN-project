import axios from "axios";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

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
        <Row>
          <div className="text-center">
            <img
              style={{ width: "250px" }}
              src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/39-512.png"
            ></img>
          </div>
        </Row>

        <h1>
          Your Email has verified<br></br>Please click the continue button to go
          Home page
        </h1>
        <div className="text-center mt-2">
          <Button style={{ backgroundColor: "green" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                fontSize: "2rem",
                color: "black",
              }}
            >
              Continue
            </Link>
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Verify;
