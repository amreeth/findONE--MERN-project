import {
  ADMIN_ADD_QUESTION_FAIL,
  ADMIN_ADD_QUESTION_SUCCESS,
  ADMIN_ADD_QUESTION_REQUEST,
  ADMIN_ALL_QUESTION_REQUEST,
  ADMIN_ALL_QUESTION_SUCCESS,
  ADMIN_ALL_QUESTION_FAIL,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAIL,
  ALL_PREMIUM_DETAILS_REQUEST,
  ALL_PREMIUM_DETAILS_FAIL,
  ALL_PREMIUM_DETAILS_SUCCESS,
  ADD_PREMIUM_REQUEST,
  ADD_PREMIUM_SUCCESS,
  ADD_PREMIUM_FAIL,
} from "../constants/adminConstants";

export const adminAddQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADD_QUESTION_REQUEST:
      return { loading: true,success: false};

    case ADMIN_ADD_QUESTION_SUCCESS:
      return { loading: false, adminInfo: action.payload, success: true };

    case ADMIN_ADD_QUESTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminAllQuestionReducer = (state = {questions:[]}, action) => {
  switch (action.type) {
    case ADMIN_ALL_QUESTION_REQUEST:
      return { ...state,loading: true };

    case ADMIN_ALL_QUESTION_SUCCESS:
      return { ...state,loading: false, questions: action.payload,};

    case ADMIN_ALL_QUESTION_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminEditQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_QUESTION_REQUEST:
      return { loadingg: true,success: false};

    case EDIT_QUESTION_SUCCESS:
      return { loadingg: false, edited: action.payload, success: true };

    case EDIT_QUESTION_FAIL:
      return { loadingg: false, errorr: action.payload };
    default:
      return state;
  }
};

export const allPremiumDetailsReducer = (state = {premiumList:[]}, action) => {
  switch (action.type) {
    case ALL_PREMIUM_DETAILS_REQUEST:
      return {loading: true };

    case ALL_PREMIUM_DETAILS_SUCCESS:
      return {loading: false, premiumList: action.payload,};

    case ALL_PREMIUM_DETAILS_FAIL:
      return {loading: false, error: action.payload };
    default:
      return state;
  }
};


export const adminAddPremiumReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PREMIUM_REQUEST:
      return { loading: true,success: false};

    case ADD_PREMIUM_SUCCESS:
      return { loading: false, adminInfo: action.payload, success: true };

    case ADD_PREMIUM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

