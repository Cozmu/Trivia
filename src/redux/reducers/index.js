import { combineReducers } from 'redux';
import questions from './questions';
import player from './Player';

const rootReducer = combineReducers({
  player,
  questions,
});

export default rootReducer;
