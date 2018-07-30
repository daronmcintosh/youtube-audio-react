export const addSearchResults = results => ({
	type: 'ADD_RESULTS',
	searchResults: results
});

export const addToQueue = videoId => ({
	type: 'ADD_TO_QUEUE',
	videoId: videoId
});

export const play = (videoId, duration) => ({
	type: 'PLAY',
	isPlaying: true,
	videoId: videoId,
	duration: duration
});

export const pause = () => ({
	type: 'PAUSE',
	isPlaying: true,
});