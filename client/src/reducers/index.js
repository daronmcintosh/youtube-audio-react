import { combineReducers } from 'redux';
import searchResults from './searchResults';
import queue from './queue';
import player from './player';

export default combineReducers({
  searchResults,
  queue,
  player,
});
