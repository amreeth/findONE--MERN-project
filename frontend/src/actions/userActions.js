import axios from "../utils/axios";
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

//=============user login===============//

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/users/login",
      {
        email,
        password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//====================user logout==========//

export const logout = () => (dispatch) => {
  console.log("logout");
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

//===============user registration==========//

export const registers =
  ({
    name,
    email,
    phonenumber,
    image,
    dob,
    gender,
    oppGender,
    password,
    cpassword,
  }) =>
  async (dispatch) => {
    console.log("reache action");
    // console.log(name,email,phonenumber,image,dob,gender,oppGender,password,cpassword);
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // console.log(image,'reached here');

      const { data } = await axios.post(
        "users/register",
        {
          name,
          email,
          phonenumber,
          image,
          dob,
          gender,
          oppGender,
          password,
          cpassword,
        },
        config
      );

      console.log(data);

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response,
        // && error.response.data.message
        //   ? error.response.data.message
        //   : error.message,
      });
    }
  };

//===========get all users===============//

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    let adminInfo = await localStorage.getItem("adminInfo");

    adminInfo = JSON.parse(adminInfo);

    console.log(adminInfo.token);

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get("/admin/usermanagement", config);

    console.log(data, "usersss");

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//==============update profile============//

export const updateUserProfile =
  ({ name, phonenumber, dob, gender, oppGender }) =>
  async (dispatch, getState) => {
    console.log("heyy reached here");

    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        "/users/profile",
        { name, phonenumber, dob, gender, oppGender },
        config
      );

      console.log(data, "useraction...");

      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updatePassword =
  ({ oldPassword, newPassword, confirmPassword }) =>
  async (dispatch, getState) => {
    console.log("hiiiiii");
    try {
      dispatch({
        type: USER_UPDATE_PASSWORD_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log(config);

      const { data } = await axios.put(
        "/users/updatepassword",
        { oldPassword, newPassword, confirmPassword },
        config
      );

      console.log(data);

      dispatch({
        type: USER_UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const forgotPassword =
  ({ email }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/users/forgotpassword",{email}, config);

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const resetPassword=({token,password})=>async(dispatch)=>{
    try {
      dispatch({
        type:RESET_PASSWORD_REQUEST
      })

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const {data}=await axios.put(`/users/password/reset/${token}`,{password},config)

      dispatch({
        type:RESET_PASSWORD_SUCCESS,
        payload:data
      })


    } catch (error) {
      dispatch({
        type:RESET_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
