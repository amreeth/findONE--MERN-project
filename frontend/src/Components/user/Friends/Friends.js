import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Button} from '@mui/material'
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { allFriends } from "../../../actions/userActions";
import Loader from "../../../Components/Loader";
import Message from "../../Message";

const Friends = () => {
  const dispatch = useDispatch();

  const allfriends = useSelector((state) => state.allFriends);
  const { loading, error, success, friends } = allfriends;

  // console.log(friends, "friends");

  useEffect(() => {
    dispatch(allFriends());
  }, [dispatch]);

  const removeFriend=(id)=>{
    console.log(id);

  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {friends && friends.length > 0 ? (
        friends.map((e) => (
          <div
            className="shadow "
            style={{
              width: "11rem",
              height: "12rem",
              borderRadius: "1rem",
              backgroundImage: `url(${e.avatar.url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-end my-3 mx-2">
              {/* <i
                className="text-dark text-end my-5 bg-white p-1 shadow"
                style={{ borderRadius: "50%", zIndex: "10" }}
              >
              </i> */}
              <Button onClick={()=>removeFriend(e._id)}><CloseRoundedIcon/></Button>  
            </div>
            <div style={{ width: "100%", height: "6rem" }}></div>
            <div className="friends-card-body text-center text-white">
              <p className=" fw-bolder text-uppercase text-black">{e.name}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <h4>you dont have no friends</h4>
        </div>
      )}
    </>
  );
};

export default Friends;
