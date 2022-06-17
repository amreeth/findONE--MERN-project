import React from "react";
import Footer from "../../Components/user/Footer/Footer";
import Header from "../../Components/user/Header/Header";
import Sidebar from "../../Components/user/Sidebar/Sidebar";
import Allsentrequest from "../../Components/user/AllSentRequest/Allsentrequest";
import AllReceivedRequest from "../../Components/user/AllReceivedRequest/AllReceivedRequest";

const AllRequestScreen = () => {
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
            <div className="col-6">
              <h4>All Received Request</h4>
              <AllReceivedRequest />
            </div>
            <div className="col-6">
              <h4>All Sent Requests</h4>  
              <Allsentrequest />
            </div>
          </div>
        </div>
        <Footer className="pt-5" />
      </div>
    </>
  );
};

export default AllRequestScreen;
