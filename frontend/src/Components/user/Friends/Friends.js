import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Button} from '@mui/material'
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { allFriends,removefriend } from "../../../actions/userActions";
import Loader from "../../../Components/Loader";
import Message from "../../Message";

const Friends = () => {
  const dispatch = useDispatch();

  const allfriends = useSelector((state) => state.allFriends);
  const { loading, error,friends } = allfriends;

  const remove=useSelector((state)=>state.removeFriend);
  const {loading:removeloading,success}=remove


  useEffect(() => {
    dispatch(allFriends());
  }, [dispatch,success]);

  const removeFriends=(id)=>{
    console.log(id);
    dispatch(removefriend(id))
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
              <Button onClick={()=>removeFriends(e._id)}><CloseRoundedIcon sx={{ color: "red"}}/></Button>  
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
