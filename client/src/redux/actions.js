import {
  SET_SEARCH_TERM,
  ADD_TO_QUEUE,
  PLAY_NEXT,
  PLAY,
  PREVIOUS_SONG,
  NEXT_SONG
} from './actionTypes';

export const setSearchTerm = searchTerm => ({
  type: SET_SEARCH_TERM,
  searchTerm
});

export const addToQueue = (videoId, title) => ({
  type: ADD_TO_QUEUE,
  videoId,
  title
});

export const playNext = (videoId, title) => ({
  type: PLAY_NEXT,
  videoId,
  title
});

export const play = (videoId, title) => ({
  type: PLAY,
  videoId,
  title
});

export const nextSong = (videoId, title) => ({
  type: NEXT_SONG,
  videoId,
  title
});

export const previousSong = (videoId, title) => ({
  type: PREVIOUS_SONG,
  videoId,
  title
});
