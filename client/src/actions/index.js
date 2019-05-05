export const addSearchResults = results => ({
  type: 'ADD_SEARCH_RESULTS',
  searchResults: results,
});

export const addToQueue = (videoId, title) => ({
  type: 'ADD_TO_QUEUE',
  videoId,
  title,
});

export const play = videoId => ({
  type: 'PLAY',
  videoId,
});

export const pause = () => ({
  type: 'PAUSE',
});

export const updateNowPlayingTitle = title => ({
  type: 'UPDATE_NOW_PLAYING_TITLE',
  title,
});

export const previousSong = () => ({
  type: 'PREVIOUS_SONG',
});

export const nextSong = () => ({
  type: 'NEXT_SONG',
});
