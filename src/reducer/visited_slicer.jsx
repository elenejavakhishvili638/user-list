const visited_reducer = (state, action) => {
  if (action.type === "VISITED_USER") {
    // return { ...state, sidebarOpen: true };
    console.log(state.visitedUser);
    const { id, item } = action.payload;

    const alreadyVisited = state.visitedUser.find(
      (visited) => visited.id === id
    );
    if (alreadyVisited) {
      return state;
    } else {
      return {
        ...state,
        visitedUser: [...state.visitedUser, { id, item }],
      };
    }
  }
};

export default visited_reducer;
