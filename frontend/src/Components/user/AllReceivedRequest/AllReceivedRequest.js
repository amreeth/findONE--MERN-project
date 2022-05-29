import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { allReceivedRequest } from "../../../actions/matchActions";
import { useAlert } from "react-alert";
import { Typography, Button } from "@mui/material";
import Loader from "../../Loader";

const AllReceivedRequest = () => {
  const dispatch = useDispatch();

  const allreceivedrequests = useSelector((state) => state.allreceivedrequests);
  const { loading, error, receivedrequest } = allreceivedrequests;

  console.log(receivedrequest);

  useEffect(() => {
    dispatch(allReceivedRequest());
  }, [dispatch]);

  const handleAccept = (id) => {

  };

  const handleDelete = (id) => {

  };

  return (
    <>
      {receivedrequest ? (
        receivedrequest.map((e) => (
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
              <Button onClick={() => handleAccept(e._id)}>Accept</Button>
              <Button onClick={() => handleDelete(e._id)}>Delete</Button>
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

export default AllReceivedRequest;
