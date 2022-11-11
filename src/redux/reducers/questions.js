import {
  REQUEST_QUESTION_SUCCESS,
} from '../actions/index';

const initionState = {
  responseCode: '',
  results: [],
};

const questions = (state = initionState, action) => {
  switch (action.type) {
  case REQUEST_QUESTION_SUCCESS:
    return {
      ...state,
      responseCode: action.payload.response_code,
      results: [...action.payload.results],
    };

  default:
    return state;
  }
};

export default questions;
