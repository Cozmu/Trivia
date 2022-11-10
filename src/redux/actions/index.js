import triviaQuestion from '../../services/perguntasAPI';

export const REQUEST_QUESTION_SUCCESS = 'REQUEST_QUESTION_SUCCESS';
// export const REQUEST_QUESTION = 'REQUEST_QUESTION';

// export const requestQuestion = () => ({
//   type: REQUEST_QUESTION,
// });

export const requestQuestionSuccess = (payload) => ({
  type: REQUEST_QUESTION_SUCCESS,
  payload,
});

export const fetchQuestion = (token) => async (dispatch) => {
  // dispatch(requestQuestion());
  try {
    const response = await triviaQuestion(token);
    dispatch(requestQuestionSuccess(response));
  } catch (error) {
    console.log(error);
  }
};

export const SAVE_NAME_AND_EMAIL = 'SAVE_NAME_AND_EMAIL';

export const saveNameAndEmail = (payload) => ({
  type: SAVE_NAME_AND_EMAIL,
  payload,
});
