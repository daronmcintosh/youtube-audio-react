import {
  SET_SEARCH_TERM,
  ADD_TO_QUEUE,
  PLAY,
  PAUSE,
  UPDATE_NOW_PLAYING_TITLE,
  PREVIOUS_SONG,
  NEXT_SONG,
} from './actionTypes';

export const setSearchTerm = term => ({
  type: SET_SEARCH_TERM,
  term,
});

export const addToQueue = (videoId, title) => ({
  type: ADD_TO_QUEUE,
  videoId,
  title,
});

export const play = videoId => ({
  type: PLAY,
  videoId,
});

export const pause = () => ({
  type: PAUSE,
});

export const updateNowPlayingTitle = title => ({
  type: UPDATE_NOW_PLAYING_TITLE,
  title,
});

export const previousSong = () => ({
  type: PREVIOUS_SONG,
});

export const nextSong = () => ({
  type: NEXT_SONG,
});
