import {
  REQUEST_QUESTION_SUCCESS,
  TIMES_UP,
} from '../actions/index';

const initionState = {
  responseCode: '',
  results: [],
  isDisabled: false,
};

const questions = (state = initionState, action) => {
  switch (action.type) {
  case REQUEST_QUESTION_SUCCESS:
    return {
      ...state,
      responseCode: action.payload.response_code,
      results: [...action.payload.results],
    };
  case TIMES_UP:
    return {
      ...state,
      isDisabled: true,
    };

  default:
    return state;
  }
};

export default questions;
