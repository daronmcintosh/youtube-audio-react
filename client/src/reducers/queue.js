const queue = (state = [], action) => {
	switch (action.type) {
	case 'ADD_TO_QUEUE':
		return [
			...state,
			action.videoId
		];
	default:
		return state;
	}
};

export default queue;
