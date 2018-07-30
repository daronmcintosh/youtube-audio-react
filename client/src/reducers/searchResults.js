const searchResults = (state = [], action) => {
	switch (action.type) {
	case 'ADD_RESULTS':
		return [
			...action.searchResults
		];
	default:
		return state;
	}
};

export default searchResults;
