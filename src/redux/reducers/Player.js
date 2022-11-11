import {
  HIT_TIME,
  RIGHT_ANSWER,
  // NEXT_QUESTION,
  SAVE_NAME_AND_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  correct: false, // mudar esse estado quando for a prox pergunta
  difficulty: '',
  nextQuestion: false,
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
      difficulty: action.difficulty,
      correct: true,
    };
  case HIT_TIME:
    return {
      ...state,
      score: computingPoints(state.score, state.difficulty, action.time),
    };
  // case NEXT_QUESTION:
  //   return {
  //     ...state,
  //     nextQuestion:
  //   };
  default:
    return state;
  }
}

export default player;
