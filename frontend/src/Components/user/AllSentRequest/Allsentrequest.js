import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { allSentRequests ,sentRequest} from "../../../actions/matchActions";
import { useAlert } from "react-alert";
import { Typography, Button } from "@mui/material";
import Loader from "../../Loader";

const Allsentrequest = () => {
  const dispatch = useDispatch();
  const allsentrequests = useSelector((state) => state.allsentrequests);
  console.log(allsentrequests);
  const { loading, error, sentrequests } = allsentrequests;

  console.log(sentrequests);

  useEffect(() => {
    dispatch(allSentRequests());
  }, [dispatch]);

 

  const handleDelete = (id) => {
    dispatch(sentRequest(id))
  };

  return (
    <>
      {sentrequests ? (
        sentrequests.map((e) => (
          <Col
            key={e._id}
            lg={8}
            className="mt-2 borrder shadow mx-auto d-flex"
            style={{ borderRadius: "5px" }}
          >
            <div>
              <h2>img</h2>
            </div>
            <div>
              <Typography>{e.name}</Typography> 
            </div>
            <div className="actions">
              <Button onClick={()=>handleDelete(e._id)}>
              Remove
              </Button>

            </div>
          </Col>
        ))
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default Allsentrequest;
