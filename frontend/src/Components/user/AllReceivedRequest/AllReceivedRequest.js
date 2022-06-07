import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  allReceivedRequest,
  acceptRequest,
  deleteRequest
} from "../../../actions/matchActions";
import { useAlert } from "react-alert";
import { Typography, Button } from "@mui/material";
import Loader from "../../Loader";

const AllReceivedRequest = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const allreceivedrequests = useSelector((state) => state.allreceivedrequests);
  const { loading, error, receivedrequest } = allreceivedrequests;
  // console.log(receivedrequest);

  const acceptRequests = useSelector((state) => state.acceptRequest);
  // console.log(acceptRequests, "dddd");
  const { loadingg, errors, data } = acceptRequests;



 
  useEffect(() => {
    dispatch(allReceivedRequest());
  }, [dispatch]);

  const handleAccept = (id) => {
    // console.log(id, "accept request");
    dispatch(acceptRequest(id));
  };


  const handleDelete = (id) => {
    // console.log(id, "delete");
    dispatch(deleteRequest(id))
  };

  return (
    <>
      {receivedrequest ? (
        receivedrequest.map((e) => (
          <Col
            key={e._id}
            className="mt-2 borrder shadow mx-auto d-flex"
            style={{ borderRadius: "5px" }}
          >
            <div>
              <h2>img</h2>
            </div>

            <div>
              <Typography variant="h5">{e.name}</Typography>
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
