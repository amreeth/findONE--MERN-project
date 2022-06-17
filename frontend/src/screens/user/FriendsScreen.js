import React from "react";
import Footer from "../../Components/user/Footer/Footer";
import Header from "../../Components/user/Header/Header";
import Sidebar from "../../Components/user/Sidebar/Sidebar";
import Friends from "../../Components/user/Friends/Friends";

const FriendsScreen = () => {
  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row d-flex justify-content-between">
          <div
            className="col-3 col-lg-3 col-md-2 "
            style={{
              borderRadius: "10px",
              backgroundColor: "white",
              width: "16rem",
            }}
          >
            <Sidebar />
          </div>
          <div className="col-9 d-flex col-lg-9 col-md-10">
            <Friends />
          </div>
        </div>
        <Footer className="pt-5" />
      </div>
    </>
  );
};

export default FriendsScreen;
