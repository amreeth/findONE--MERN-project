import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import MoreDetails from "../../Components/user/Matches/MoreDetails";
import Header from "../../Components/user/Header/Header";
import { getMatchDetails } from "../../actions/matchActions";
import Loader from "../../Components/Loader";
import Footer from "../../Components/user/Footer/Footer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { favAddRemove, sentRequest } from "../../actions/matchActions";
import ChatIcon from "@mui/icons-material/Chat";

const MactherScreen = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  const matchDetail = useSelector((state) => state.matchDetails);
  const { loading, error, success, match, moreDetails } = matchDetail;

  const addRemovefav = useSelector((state) => state.addRemoveFav);
  const { loading: favLoading } = addRemovefav;

  const sentRemoveRequest = useSelector((state) => state.sentRemoveRequest);
  const { loading: requestLoading } = sentRemoveRequest;

  let images = [];
  if (moreDetails) {
    images = moreDetails.images;
  }

  let userInfo = localStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  const fav = userInfo.favourites.includes(id);
  const friend = userInfo.friends.includes(id);
  const request = userInfo.sentrequests.includes(id);

  useEffect(() => {
    dispatch(getMatchDetails(id));
  }, [dispatch]);

  const addfav = (id) => {
    console.log(id);
    dispatch(favAddRemove(id));
  };

  const sentRequests = (id) => {
    console.log(id);
    dispatch(sentRequest(id));
  };

  return (
    <>
      <Header />
      <div class=" container pt-3 ">
        <div class="card user-card-full container-of-user-profile">
          <div class="row m-l-0 m-r-0">
            {loading && <Loader />}
            <div class="col-sm-4 bg-c-lite-green user-profile">
              <div class="card-block text-center text-white container-of-user-profile">
                <div class="m-b-25 mt-5">
                  <img
                    src={match ? match?.avatar?.url : ""}
                    class="img-radius mt-4"
                    alt="User-Profile-Image"
                  />
                </div>
                <h6 class="f-w-600">{match ? match.name : ""}</h6>
                <p>{match ? match.dob : " "} Years</p>
                <p>Lives in Kochi</p>

                <Button onClick={() => addfav(id)}>
                  {fav ? (
                    <FavoriteIcon fontSize="large" />
                  ) : (
                    <FavoriteBorderIcon fontSize="large" />
                  )}
                </Button>

                {friend ? (
                  <Link to="/messanger">
                    <ChatIcon fontSize="large" />
                  </Link>
                ) : (
                  <Button onClick={() => sentRequests(id)}>
                    {request ? (
                      <PersonAddIcon fontSize="large" />
                    ) : (
                      <PersonAddOutlinedIcon fontSize="large" />
                    )}
                  </Button>
                )}

                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="card-block mt-5">
                <MoreDetails images={images} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MactherScreen;
