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

export const RIGHT_ANSWER = 'RIGHT_ANSWER';
export const rightAnswer = (difficulty, time) => ({
  type: RIGHT_ANSWER,
  difficulty,
  time,
});

export const FOLLOWING = 'FOLLOWING';
export const following = () => ({
  type: FOLLOWING,
});

export const NEXT_QUESTION = 'NEXT_QUESTION';
export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const DEFAULT_CORRECT = 'DEFAULT_CORRECT';
export const defaultCorrect = () => ({
  type: DEFAULT_CORRECT,
});
