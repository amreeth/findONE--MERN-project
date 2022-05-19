import {
  ALL_MATCHES_FAIL,
  ALL_MATCHES_SUCCESS,
  ALL_MATCHES_REQUEST,
  CLEAR_ERRORS,
  MATCH_DETAILS_FAIL,
  MATCH_DETAILS_SUCCESS,
  MATCH_DETAILS_REQUEST,
} from "../constants/matchConstants";

export const matchesReducer = (state = { matches: [] }, action) => {
  switch (action.type) {
    case ALL_MATCHES_REQUEST:
      return { loading: true, matches: [] };

    case ALL_MATCHES_SUCCESS:
      return {
        loading: false,
        matches: action.payload.matches,
      };

    case ALL_MATCHES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};





export const matchesDetailsReducer = (state = { match:{} }, action) => {
    switch (action.type) {
      case MATCH_DETAILS_REQUEST:
        return { loading: true,...state};
  
      case MATCH_DETAILS_SUCCESS:
        return {
          loading: false,
          match: action.payload,
        };
  
      case MATCH_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
