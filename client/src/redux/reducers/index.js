import { combineReducers } from 'redux';
import searchTerm from './searchTerm';
import queue from './queue';
import player from './player';

export default combineReducers({
  searchTerm,
  queue,
  player,
});
