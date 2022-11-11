import {
  REQUEST_QUESTION_SUCCESS,
  TIMES_UP,
  NEXT_QUESTION,
  FOLLOWING,
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
      proxPergunta: true,
    };
  case FOLLOWING:
    return {
      ...state,
      proxPergunta: true,
      isDisabled: true,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      isDisabled: false,
      proxPergunta: false,
    };
  default:
    return state;
  }
};

export default questions;
