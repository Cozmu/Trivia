import { SAVE_NAME_AND_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_NAME_AND_EMAIL:
    return { ...state,
      gravatarEmail: action.gravatarEmail,
      name: action.name,
    };
  default:
    return state;
  }
}

export default player;
