import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { allSentRequests ,sentRequest} from "../../../actions/matchActions";
import { useAlert } from "react-alert";
import { Typography, Button } from "@mui/material";
import Loader from "../../Loader";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

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
            className="mt-2 borrder shadow mx-auto d-flex "
            style={{ borderRadius: "5px",textAlign:'center' }}
          >
            <div>
             <img style={{width:"50px",borderRadius: "5px"}} src={e.avatar.url}></img>
            </div>
            <div className="p-2">
              <Typography variant='h4'>{e.name}</Typography> 
            </div>
            <div className="p-2">
              <Button onClick={()=>handleDelete(e._id)}>
              <DeleteOutlineTwoToneIcon/>
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
