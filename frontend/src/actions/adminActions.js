import axios from "../utils/axios";
import {
  ADMIN_ADD_QUESTION_FAIL,
  ADMIN_ADD_QUESTION_SUCCESS,
  ADMIN_ADD_QUESTION_REQUEST,
  ADMIN_ALL_QUESTION_REQUEST,
  ADMIN_ALL_QUESTION_SUCCESS,
  ADMIN_ALL_QUESTION_FAIL,
  ADMIN_DELETE_QUESTION_REQUEST,
  ADMIN_DELETE_QUESTION_SUCCESS,
  ADMIN_DELETE_QUESTION_FAIL,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAIL,
  ALL_PREMIUM_DETAILS_REQUEST,
  ALL_PREMIUM_DETAILS_SUCCESS,
  ALL_PREMIUM_DETAILS_FAIL,
  ADD_PREMIUM_REQUEST,
  ADD_PREMIUM_SUCCESS,
  ADD_PREMIUM_FAIL,
  ALL_PREMIUM_USERS_REQUEST,
  ALL_PREMIUM_USERS_SUCCESS,
  ALL_PREMIUM_USERS_FAIL,
} from "../constants/adminConstants";


//==============add question==================//

export const addQuestion =
  ({ question, option1, option2, option3, option4 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADMIN_ADD_QUESTION_REQUEST,
      });

      let adminInfo = await localStorage.getItem("adminInfo");

      adminInfo = JSON.parse(adminInfo);

      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const id = "profile";

      const { data } = await axios.post(
        `/admin/question/${id}`,
        { question, option1, option2, option3, option4 },
        config
      );

      dispatch({
        type: ADMIN_ADD_QUESTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ADD_QUESTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


//===================edit question==================//

  export const editQuestion =
  ({ id,question, option1, option2, option3, option4 }) =>
  async (dispatch,getState) => {

    console.log('here');

    try {
      dispatch({
        type: EDIT_QUESTION_REQUEST,
      });

      const { adminAllQuestions: {questions}} = getState()

      let adminInfo = await localStorage.getItem("adminInfo");
      adminInfo = JSON.parse(adminInfo);
      
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/admin/question/${id}`,
        { question, option1, option2, option3, option4 },
        config
      );

      dispatch({
        type: EDIT_QUESTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_QUESTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//==============all question ====================//

export const allQuestions = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_ALL_QUESTION_REQUEST,
    });

    let adminInfo = await localStorage.getItem("adminInfo");
    adminInfo = JSON.parse(adminInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get("/admin/allquestions", config);
    console.log(data, "questions");

    dispatch({
      type: ADMIN_ALL_QUESTION_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ADMIN_ALL_QUESTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




//======================all premium status=================//

export const allPremiumList = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PREMIUM_DETAILS_REQUEST,
    });

    let adminInfo = await localStorage.getItem("adminInfo");
    adminInfo = JSON.parse(adminInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get("/admin/allPremiumStatus", config);
    console.log(data, "all premium status");

    dispatch({
      type: ALL_PREMIUM_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ALL_PREMIUM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//===============add premium =================//


export const addPremium =
  ({ name,category,price,days}) =>
  async (dispatch) => {

    try {
      dispatch({
        type: ADD_PREMIUM_REQUEST,
      });

      let adminInfo = await localStorage.getItem("adminInfo");
      adminInfo = JSON.parse(adminInfo);
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.post(
        '/admin/addpremium',{ name,category,price,days},
        config
      );

      dispatch({
        type: ADD_PREMIUM_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: ADD_PREMIUM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };



  //===========get premium users===========//


  export const getAllPremiumUsers=()=>async(dispatch)=>{
    try {
      dispatch({
        type:ALL_PREMIUM_USERS_REQUEST
      })

      let adminInfo=await localStorage.getItem('adminInfo')
      adminInfo=JSON.parse(adminInfo)

      const config={
        headers:{
          Authorization:`Bearer ${adminInfo.token}`
        }
      }

      const {data}=await axios.get('/admin/allpremiumusers',config)

      dispatch({
        type:ALL_PREMIUM_USERS_SUCCESS,
        payload:data
      })

    } catch (error) {
      dispatch({
        type:ALL_PREMIUM_USERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }