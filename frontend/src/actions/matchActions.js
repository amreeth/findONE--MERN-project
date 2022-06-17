import axios from "../utils/axios";

import {
  ALL_MATCHES_FAIL,
  ALL_MATCHES_SUCCESS,
  ALL_MATCHES_REQUEST,
  CLEAR_ERRORS,
  MATCH_DETAILS_FAIL,
  MATCH_DETAILS_REQUEST,
  MATCH_DETAILS_SUCCESS,
  MATCH_FAV_REQUEST,
  MATCH_FAV_SUCCESS,
  MATCH_FAV_FAIL,
  MATCH_SENTREQUEST_FAIL,
  MATCH_SENTREQUEST_REQUEST,
  MATCH_SENTREQUEST_SUCCESS,
  ALL_SENT_REQUESTS_REQUEST,
  ALL_SENT_REQUESTS_SUCCESS,
  ALL_SENT_REQUESTS_FAIL,
  ALL_RECEIVED_REQUESTS_REQUEST,
  ALL_RECEIVED_REQUESTS_SUCCESS,
  ALL_RECEIVED_REQUESTS_FAIL,
  ACCEPT_REQUEST_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAIL,
  REMOVE_REQUEST_REQUEST,
  REMOVE_REQUEST_SUCCESS,
  REMOVE_REQUEST_FAIL
} from "../constants/matchConstants";

//=============all matches===============//

export const getMatches = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_MATCHES_REQUEST,
    });

    let userInfo = await localStorage.getItem("userInfo");

    userInfo = JSON.parse(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/match/allMatches", config);

    console.log(data);

    dispatch({
      type: ALL_MATCHES_SUCCESS,
      payload: data,
    });

    // console.log(data);
  } catch (error) {
    dispatch({
      type: ALL_MATCHES_FAIL,
      payload: error.response.data.message,
    });
  }
};

//================match details===============//

export const getMatchDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MATCH_DETAILS_REQUEST,
    });

    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/match/${id}`, config);

    // console.log(data);

    dispatch({
      type: MATCH_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MATCH_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//=========add or remove to favourite==================//

export const favAddRemove = (id) => async (dispatch) => {
  console.log("reach fav action ");

  try {
    dispatch({
      type: MATCH_FAV_REQUEST,
    });

    let userInfo =localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    // console.log(userInfo.token, "userinfo");

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/users/favadd/${id}`, config);
    // console.log(data, "dadadasd");

    dispatch({
      type: MATCH_FAV_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MATCH_FAV_FAIL,
      payload: error.response.data.message,
    });
  }
};

//==========sentRequest===============//

export const sentRequest = (id) => async (dispatch,getState) => {
  try {
    dispatch({
      type: MATCH_SENTREQUEST_REQUEST,
    });

    let userInfo = await localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/users/sentrequest/${id}`, config);
    // console.log(data);

    dispatch({
      type: MATCH_SENTREQUEST_SUCCESS,
      payload: data.match,
    });
  } catch (error) {
    dispatch({
      type: MATCH_SENTREQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//================all requests============//

export const allSentRequests = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_SENT_REQUESTS_REQUEST,
    });

    let userInfo = await localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/users/allsentrequest", config);
// console.log(data.users,'fadda');

    dispatch({
      type: ALL_SENT_REQUESTS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_SENT_REQUESTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//============all received requests=========//

export const allReceivedRequest = () => async (dispatch) => {
  try {
    dispatch({
      type:ALL_RECEIVED_REQUESTS_REQUEST
    })

    let userInfo = await localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/users/allrequests", config);

    dispatch({
      type: ALL_RECEIVED_REQUESTS_SUCCESS,
      payload: data.users,
    });


  } catch (error) {
    dispatch({
      type: ALL_RECEIVED_REQUESTS_FAIL,
      payload: error.response.data.message,
    });
  }
};



//===================accept request==========//

export const acceptRequest=(id)=>async(dispatch,getState)=>{

  const {allreceivedrequests:{receivedrequest}}=getState()
  try {
    dispatch({
      type:ACCEPT_REQUEST_REQUEST
    })

    let userInfo = await localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data}=await axios.get(`/users/acceptrequest/${id}`,config)

    dispatch({
      type:ACCEPT_REQUEST_SUCCESS,
      payload:data
    })
    dispatch({
      type: ALL_RECEIVED_REQUESTS_SUCCESS,
      payload:receivedrequest.filter((obj)=>{
        if(obj._id!=id){
          return obj
        }
      })
    });

  } catch (error) {
    dispatch({
      type:ACCEPT_REQUEST_FAIL,
      payload: error.response.data.message,
    })
  }
}



//==========delete request ===========//

export const deleteRequest=(id)=>async(dispatch,getState)=>{

  try {
    dispatch({
      type:REMOVE_REQUEST_REQUEST
    })
    
    const {allreceivedrequests:{receivedrequest}}=getState()

    let userInfo = await localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data}=await axios.get(`/users/deleterequest/${id}`,config)

    dispatch({
      type:REMOVE_REQUEST_SUCCESS,
      payload:data
    })

    dispatch({
      type: ALL_RECEIVED_REQUESTS_SUCCESS,
      payload:receivedrequest.filter((obj)=>{
        if(obj._id!=id){
          return obj
        }
      })
    });

  } catch (error) {
    dispatch({
      type:REMOVE_REQUEST_FAIL,
      payload: error.response.data.message,
    })
  }
}



//================clear errors=============//

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
