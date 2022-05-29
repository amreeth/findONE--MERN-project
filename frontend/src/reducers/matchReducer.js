import {
  ALL_MATCHES_FAIL,
  ALL_MATCHES_SUCCESS,
  ALL_MATCHES_REQUEST,
  CLEAR_ERRORS,
  MATCH_DETAILS_FAIL,
  MATCH_DETAILS_SUCCESS,
  MATCH_DETAILS_REQUEST,
  MATCH_FAV_REQUEST,
  MATCH_FAV_SUCCESS,
  MATCH_FAV_FAIL,
  MATCH_SENTREQUEST_REQUEST,
  MATCH_SENTREQUEST_SUCCESS,
  MATCH_SENTREQUEST_FAIL,
  ALL_SENT_REQUESTS_SUCCESS,
  ALL_SENT_REQUESTS_FAIL,
  ALL_SENT_REQUESTS_REQUEST,
  ALL_RECEIVED_REQUESTS_REQUEST,
  ALL_RECEIVED_REQUESTS_SUCCESS,
  ALL_RECEIVED_REQUESTS_FAIL,
} from "../constants/matchConstants";

export const matchesReducer = (state = { matches: [] }, action) => {
  switch (action.type) {
    case ALL_MATCHES_REQUEST:
      return { loading: true };

    case ALL_MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        matches: action.payload.matches,
      };

    case ALL_MATCHES_FAIL:
      return {
        ...state,
        loading: false,
        matches: null,
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

export const matchesDetailsReducer = (state = { match: {} }, action) => {
  switch (action.type) {
    case MATCH_DETAILS_REQUEST:
      return { loading: true, ...state };

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

export const addRemoveFavReducer = (state = {}, action) => {
  switch (action.type) {
    case MATCH_FAV_REQUEST:
      return { loading: true, ...state };

    case MATCH_FAV_SUCCESS:
      return {
        loading: false,
        fav: action.payload,
      };
    case MATCH_FAV_FAIL:
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

export const matchSentRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case MATCH_SENTREQUEST_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case MATCH_SENTREQUEST_SUCCESS:
      return {
        loading: false,
        sentrequest: action.payload,
      };
    case MATCH_SENTREQUEST_FAIL:
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

export const allSentRequestsReducer = (
  state = { sentrequests: [] },
  action
) => {
  switch (action.type) {
    case ALL_SENT_REQUESTS_REQUEST:
      return {
        loading: true,
      };

    case ALL_SENT_REQUESTS_SUCCESS:
      return {
        loading: false,
        ...state,
        sentrequests: action.payload,
      };

    case ALL_SENT_REQUESTS_FAIL:
      return {
        ...state,
        loading: false,
        sentrequests: null,
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

export const allReceivedRequestReducer = (
  state = { receivedrequest: [] },
  action
) => {
  switch (action.type) {
    case ALL_RECEIVED_REQUESTS_REQUEST:
      return {
        loading: true,
      };
    case ALL_RECEIVED_REQUESTS_SUCCESS:
      return {
        loading: false,
        ...state,
        receivedrequest: action.payload,
      };
    case ALL_RECEIVED_REQUESTS_FAIL:
      return {
        loading: false,
        receivedrequest: null,
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



