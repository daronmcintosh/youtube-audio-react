import {
  PLAY, ADD_TO_QUEUE, PLAY_NEXT, NEXT_SONG, PREVIOUS_SONG,
} from '../actionTypes';

const defaultState = {
  videoId: '',
  title: '',
  currentSongIndex: -1,
  queue: [],
};

const player = (state = defaultState, action) => {
  const { videoId, title } = action;
  switch (action.type) {
    case PLAY: {
      const newArray = state.queue.slice();
      const newIndex = state.currentSongIndex + 1;
      newArray.splice(newIndex, 0, { videoId, title });
      return Object.assign({}, state, {
        videoId,
        title,
        currentSongIndex: newIndex,
        queue: newArray,
      });
    }
    case PREVIOUS_SONG: {
      const newIndex = state.currentSongIndex - 1;
      return Object.assign({}, state, { currentSongIndex: newIndex, videoId, title });
    }
    case NEXT_SONG: {
      const newIndex = state.currentSongIndex + 1;
      return Object.assign({}, state, { currentSongIndex: newIndex, videoId, title });
    }
    case ADD_TO_QUEUE: {
      return Object.assign({}, state, { queue: [...state.queue, { videoId, title }] });
    }
    case PLAY_NEXT: {
      const newArray = state.queue.slice();
      const nextIndex = state.currentSongIndex + 1;
      newArray.splice(nextIndex, 0, { videoId, title });
      return Object.assign({}, state, { queue: newArray });
    }
    default:
      return state;
  }
};

export default player;
