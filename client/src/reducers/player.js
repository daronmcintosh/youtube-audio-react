const defaultState = {
	isPlaying: false,
	videoId: 0,
	title: ''
};

const player = (state = defaultState, action) => {
	switch (action.type) {
	case 'PLAY':
		return Object.assign({}, state, {isPlaying: true, videoId: action.videoId});
	case 'PAUSE':
		return Object.assign({}, state, {isPlaying: false});
	case 'UPDATE_NOW_PLAYING_TITLE':
		return Object.assign({}, state, {title: action.title});
	default:
		return state;
	}
};

export default player;
