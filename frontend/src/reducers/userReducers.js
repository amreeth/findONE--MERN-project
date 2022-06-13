import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  PAYEMENT_REQUEST,
  PAYEMENT_FAIL,
  PAYEMENT_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload };

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case USER_UPDATE_PASSWORD_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };
    case USER_UPDATE_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const payementReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYEMENT_REQUEST:
      return {
        loading: true,
      };
    case PAYEMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAYEMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
