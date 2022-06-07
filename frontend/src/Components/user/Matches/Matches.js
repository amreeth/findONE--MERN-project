import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { Typography } from "@mui/material";
import { getMatchDetails } from "../../../actions/matchActions";
import Loader from '../../Loader'

const Matches = ({ id }) => {

  const dispatch = useDispatch();
  const matchDetail = useSelector((state) => state.matchDetails);
  const { loading, error, success, match } = matchDetail;

  useEffect(() => {
    dispatch(getMatchDetails(id));
  }, [dispatch]);

  console.log(match);

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <Row className="rounded shadow bg-light">
          <Col className="mx-auto rounded p-3" lg={12}>
            <img src={match.avatar ? match.avatar.url : ""} width={"100%"} />
          </Col>
          <div className="d-flex justify-content-between py-1 px-3">
            <Typography variant="h4" className="text-uppercase">
              {match ? match.name : ""}
            </Typography>
            <Typography variant="h4">{match ? match.dob : " "}</Typography>
          </div>
          <Typography>Lives in Kochi</Typography>
        </Row>
      )}
    </>
  );
};

export default Matches;
