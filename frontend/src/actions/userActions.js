import axios from '../utils/axios'
import {
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
  ({ name,email,phonenumber,image,dob,gender,oppGender,password,cpassword}) =>
  
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

      const { data } = await axios.post("users/register",
        { name,email,phonenumber,image,dob,gender,oppGender,password,cpassword},config);

      console.log(data);

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      
      dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
      })
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response 
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

//=================user profile=====================//

// export const getUserDetails = (id) => async (dispatch, getState) => {
 
//   try {
//     dispatch({
//       type: USER_DETAILS_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(`/users/${id}`, config);



//     dispatch({
//       type: USER_DETAILS_SUCCESS,
//       payload: data,
//     });

//   } catch (error) {
//     dispatch({
//       type: USER_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

//==============update profile============//

export const updateUserProfile = (user) => async (dispatch, getState) => {
  
  // console.log('hiiiiiii');

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
    const id='profile';

    const { data } = await axios.put(`/users/profile/${id}`, user, config);

    console.log(data, "useraction...");

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
