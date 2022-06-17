import React, { useEffect } from "react";
import Header from "../../Components/user/Header/Header";
import Footer from "../../Components/user/Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Changepassword from "../../Components/user/UserDetails/Changepassword";
import EditProfile from "../../Components/user/UserDetails/EditProfile";
import Moredetail from "../../Components/user/UserMoreDetails/Moredetail";
import "../../Components/user/UserDetails/profile.css";


const ProfileScreen = () => {
  const navigate = useNavigate();

  let {
    userLogin: { userInfo },
  } = useSelector((state) => state);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <>
      <Header />
      <div class=" container pt-3 ">
        <div class="card user-card-full container-of-user-profile">
          <div class="row m-l-0 m-r-0">
            <div class="col-sm-4 bg-c-lite-green user-profile">
              <div class="card-block text-center text-white container-of-user-profile">
                <div class="m-b-25 mt-2">
                  <img
                    src={userInfo ? userInfo.avatar.url : ""}
                    class="img-radius mt-4"
                    alt="User-Profile-Image"
                  />  
                </div>
                <h3 class="f-w-600">{userInfo.name}</h3>
                <h5>{userInfo.dob} Years</h5>
                <p>Lives in Kochi</p>
                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                <Changepassword />
                <EditProfile />
              </div>
            </div>  
            <div class="col-sm-8">
              <div class="card-block">
                <Moredetail />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProfileScreen;
