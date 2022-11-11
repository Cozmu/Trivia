import triviaQuestion from '../../services/perguntasAPI';

export const REQUEST_QUESTION_SUCCESS = 'REQUEST_QUESTION_SUCCESS';

export const requestQuestionSuccess = (payload) => ({
  type: REQUEST_QUESTION_SUCCESS,
  payload,
});

export const fetchQuestion = (token) => async (dispatch) => {
  try {
    const response = await triviaQuestion(token);
    dispatch(requestQuestionSuccess(response));
  } catch (error) {
    console.log(error);
  }
};

export const SAVE_NAME_AND_EMAIL = 'SAVE_NAME_AND_EMAIL';

export const saveNameAndEmail = (name, gravatarEmail) => ({
  type: SAVE_NAME_AND_EMAIL,
  name,
  gravatarEmail,
});

export const TIMES_UP = 'TIMES_UP';

export const timesUp = () => ({
  type: TIMES_UP,
});
