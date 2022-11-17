import {
  DEFAULT_CORRECT, RESET_SCORE, RIGHT_ANSWER, SAVE_NAME_AND_EMAIL,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  correct: false,
};

const computingPoints = (previousPoints, difficulty, time) => {
  const THREE = 3;
  const TEN = 10;
  let difficultyPoints = 0;
  if (difficulty === 'hard') {
    difficultyPoints += THREE;
  }
  if (difficulty === 'medium') {
    difficultyPoints += 2;
  }
  if (difficulty === 'easy') {
    difficultyPoints += 1;
  }
  const soma = TEN + (time * difficultyPoints);
  const x = previousPoints + soma;

  return x;
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_NAME_AND_EMAIL:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
      name: action.name,
    };
  case RIGHT_ANSWER:
    return {
      ...state,
      correct: true,
      score: computingPoints(state.score, action.difficulty, action.time),
      assertions: state.assertions + 1,
    };
  case DEFAULT_CORRECT:
    return {
      ...state,
      correct: false,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
      correct: false,
    };
  default:
    return state;
  }
}

export default player;
