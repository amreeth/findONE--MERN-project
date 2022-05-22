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




