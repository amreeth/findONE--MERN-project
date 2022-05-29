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
} from "../constants/adminConstants";

export const addQuestion =
  ({ question, option1, option2, option3, option4 }) =>
  async (dispatch) => {
    // console.log("reache action");
    // console.log(question);
    try {
      dispatch({
        type: ADMIN_ADD_QUESTION_REQUEST,
      });

      let adminInfo = await localStorage.getItem("adminInfo");

      adminInfo = JSON.parse(adminInfo);

      // console.log(adminInfo.token);

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



export const allQuestions = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_ALL_QUESTION_REQUEST,
    });

    let adminInfo = await localStorage.getItem("adminInfo");

    adminInfo = JSON.parse(adminInfo);

    // console.log(adminInfo.token);

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



