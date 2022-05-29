import React, { useEffect, useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Chat,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getMatches,
  favAddRemove,
  sentRequest,
} from "../../../actions/matchActions";
import { Col } from "react-bootstrap";
import { useAlert } from "react-alert";
import Loader from '../../Loader'

const Card = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const allMatches = useSelector((state) => state.matches);
  const { loading, error, matches } = allMatches;

  const addRemovefav = useSelector((state) => state.addRemoveFav);
  const { loading: favLoading, fav } = addRemovefav;

  const sentRemoveRequest = useSelector((state) => state.sentRemoveRequest);
  const { loading: requestLoading, sentrequest } = sentRemoveRequest;

  
  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  const handleLike = (id) => {
    dispatch(favAddRemove(id));
    // console.log('hiiiii');
    alert.success("Add to Favourites");
  };

  const handleRequest = (id) => {
    dispatch(sentRequest(id));
    alert.success("sent request to user");
  };

  return (
    <>
      {matches ? (
        matches
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((e) => (
            <Col key={e._id} lg={4}>
              <div className="card">
                <Link to={`/match/${e._id}`}>
                 
                  <img height={300} width={"100%"} src={e.avatar.url}></img>
              
                </Link>
                <div class="footer">
                  <div class="info">
                    <div class="name">
                      <Typography>{e.name}</Typography>
                      <Typography>{e.dob}</Typography>
                    </div>
                    {/* <div class="location">{location}</div> */}
                    <div className="Cardfooter">
                      <Button onClick={() => handleLike(e._id)}>
                        {fav ? (
                          <Favorite style={{ color: "red" }} />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </Button>

                      <Button onClick={() => handleRequest(e._id)}>
                        {sentrequest ? (
                          <Chat style={{ color: "black" }} />
                        ) : (
                          <ChatBubbleOutline />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </Col>
          ))
      ) : (
        <div>
          <Loader/>
        </div>
      )}
    </>
  );
};

export default Card;
