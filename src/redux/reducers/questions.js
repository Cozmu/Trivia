import {
  REQUEST_QUESTION_SUCCESS,
  // REQUEST_QUESTION,
} from '../actions/index';

const initionState = {
  responseCode: '',
  results: [],
};

const questions = (state = initionState, action) => {
  switch (action.type) {
  // case REQUEST_QUESTION:
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  case REQUEST_QUESTION_SUCCESS:
    return {
      ...state,
      responseCode: action.payload.response_code,
      results: [...action.payload.results],
      // isLoading: false,
    };

  default:
    return state;
  }
};

export default questions;
