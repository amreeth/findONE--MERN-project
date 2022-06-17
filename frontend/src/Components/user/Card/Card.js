import React, { useEffect, useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import {Button } from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Chat,
} from "@material-ui/icons";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import { useSelector, useDispatch } from "react-redux";
import {
  getMatches,
  favAddRemove,
  sentRequest,
} from "../../../actions/matchActions";
import { Col } from "react-bootstrap";
import { useAlert } from "react-alert";
import Loader from "../../Loader";

const Card = () => {
  let userInfo = localStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  let userId = userInfo._id;

  const alert = useAlert();
  const dispatch = useDispatch();
  const allMatches = useSelector((state) => state.matches);
  const { loading, error, matches } = allMatches;

  const addRemovefav = useSelector((state) =>state.addRemoveFav);
  const { loading: favLoading, fav } = addRemovefav;

  const sentRemoveRequest = useSelector((state) => state.sentRemoveRequest);
  const { loading: requestLoading, sentrequest } = sentRemoveRequest;

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  const handleLike = (id) => {
    dispatch(favAddRemove(id));
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
            <Col key={e._id} lg={4} md={4} sm={6} xs={12}>
                <div class="user-profile-card ">
                <Link to={`/match/${e._id}`}>
                  <img
                    src={e.avatar.url}
                    alt="Person"
                    class="card-user-image"
                  />
                  </Link>
                  <p class="card-user-name">{e.name}</p>
                  <ul class="card-social-icons">
                    <li>
                      
                      <Button onClick={() => handleLike(e._id)}>
                        {fav ? (
                          <Favorite style={{ color: "red" }} />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </Button>
                    </li>
                    <li>
                    {
                        e.friends.includes(userId)?<Chat />:
                        <Button onClick={() => handleRequest(e._id)}>
                          
                        {sentrequest ? (
                          <Chat style={{ color: "black" }} />
                        ) : (
                          <PersonAddSharpIcon />
                        )}
                      </Button>
                      }
                    </li>
                  </ul>
                  <div class="d-flex bd-highlight mb-3">
                    <div class="me-auto p-2 bd-highlight">{e.dob} Years</div>
                    <div class="p-2 bd-highlight">Kochin</div>
                  </div>
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

export default Card;
