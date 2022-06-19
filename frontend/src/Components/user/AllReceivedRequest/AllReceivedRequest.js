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
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';


const AllReceivedRequest = () => {

  const dispatch = useDispatch();

  const allreceivedrequests = useSelector((state) => state.allreceivedrequests);
  const { loading, error, receivedrequest } = allreceivedrequests;
  
  const acceptRequests = useSelector((state) => state.acceptRequest);
  const { loadingg, errors, data } = acceptRequests;

 
  useEffect(() => {
    dispatch(allReceivedRequest());
  }, [dispatch]);

  const handleAccept = (id) => {
    dispatch(acceptRequest(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteRequest(id))
  };

  // console.log(receivedrequest.length);

  return (
    <>
    {loading&&<Loader/>}

      {receivedrequest ? (
        receivedrequest.map((e) => (
          <Col
            key={e._id}
            className="mt-2 borrder shadow mx-auto d-flex"
            style={{ borderRadius: "5px" }}
          >
            <div>
            <img style={{width:"50px",borderRadius: "5px"}} src={e.avatar.url}></img>
            </div>
            <div className="p-2">
              <Typography variant="h5">{e.name}</Typography>
            </div>
            <div className="p-2">
              <Button onClick={() => handleAccept(e._id)}><DoneAllTwoToneIcon/></Button>
              <Button onClick={() => handleDelete(e._id)}><DeleteOutlineTwoToneIcon/></Button>
            </div>
          </Col>
        ))
      ) : (
        <div>
          <h4>You have no friends requests</h4>
        </div>
      )}
    </>
  );
};

export default AllReceivedRequest;
