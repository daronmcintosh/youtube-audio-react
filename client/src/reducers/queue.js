const queue = (state = [], action) => {
  const { videoId } = action;
  const { title } = action;
  switch (action.type) {
    case 'ADD_TO_QUEUE':
      return [
        ...state,
        { videoId, title },
      ];
    default:
      return state;
  }
};

export default queue;
