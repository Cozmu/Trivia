import {
  REQUEST_QUESTION_SUCCESS,
  TIMES_UP,
  NEXT_QUESTION,
} from '../actions/index';

const initionState = {
  responseCode: '',
  results: [],
  isDisabled: false,
  proxPergunta: false,
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
      nextQuestion: true,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      proxPergunta: true,
    };
  default:
    return state;
  }
};

export default questions;
