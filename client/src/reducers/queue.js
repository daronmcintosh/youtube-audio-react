const queue = (state = [], action) => {
	let videoId = action.videoId;
	let title = action.title;
	switch (action.type) {
	case 'ADD_TO_QUEUE':
		return [
			...state,
			{videoId, title}
			// action.videoId
		];
	default:
		return state;
	}
};

export default queue;
