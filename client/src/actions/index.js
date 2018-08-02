export const addSearchResults = results => ({
	type: 'ADD_RESULTS',
	searchResults: results
});

export const addToQueue = videoId => ({
	type: 'ADD_TO_QUEUE',
	videoId: videoId
});

export const play = (videoId) => ({
	type: 'PLAY',
	videoId: videoId
});

export const pause = () => ({
	type: 'PAUSE',
});