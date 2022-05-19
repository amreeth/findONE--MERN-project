import axios from "axios";

import {
  ALL_MATCHES_FAIL,
  ALL_MATCHES_SUCCESS,
  ALL_MATCHES_REQUEST,
  CLEAR_ERRORS,
  MATCH_DETAILS_FAIL,
  MATCH_DETAILS_REQUEST,
  MATCH_DETAILS_SUCCESS

} from "../constants/matchConstants";

export const getMatches = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_MATCHES_REQUEST,
    });

    const { data } = await axios.get("/api/users/matches");

    dispatch({
      type: ALL_MATCHES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MATCHES_FAIL,
      payload: error.response.data.message,
    });
  }
};




export const getMatchDetails = (id) => async (dispatch) => {
    try {
      dispatch({
        type:MATCH_DETAILS_REQUEST,
      });
  
      const { data } = await axios.get(`/api/users/match/${id}`);
  
      dispatch({
        type: MATCH_DETAILS_SUCCESS,
        payload: data.match,
      });
    } catch (error) {
      dispatch({
        type: MATCH_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };




//clear errors

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};



