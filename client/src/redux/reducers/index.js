import { combineReducers } from 'redux';
import searchTerm from './searchTerm';
import player from './player';

export default combineReducers({
  searchTerm,
  player,
});
