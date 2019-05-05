const defaultState = {
  isPlaying: false,
  videoId: 0,
  title: '',
  currentSongIndex: -1,
};

const player = (state = defaultState, action) => {
  switch (action.type) {
    case 'PLAY':
      return Object.assign({}, state, { isPlaying: true, videoId: action.videoId });
    case 'PAUSE':
      return Object.assign({}, state, { isPlaying: false });
    case 'UPDATE_NOW_PLAYING_TITLE':
      return Object.assign({}, state, { title: action.title });
    case 'PREVIOUS_SONG':
      if (state.currentSongIndex > 0) {
        return Object.assign({}, state, { currentSongIndex: state.currentSongIndex -= 1 });
      }
      return null;
    case 'NEXT_SONG':
      return Object.assign({}, state, { currentSongIndex: state.currentSongIndex += 1 });
    default:
      return state;
  }
};

export default player;
