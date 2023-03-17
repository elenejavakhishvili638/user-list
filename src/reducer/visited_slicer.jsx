const visited_reducer = (state, action) => {
  if (action.type === "VISITED_USER") {
    // return { ...state, sidebarOpen: true };
    console.log(state.visitedUser);
    const { id, fullName, clicked } = action.payload;

    console.log(action.payload);

    const alreadyVisited = state.visitedUser.find(
      (visited) => visited.id === id
    );
    if (alreadyVisited) {
      return state;
    } else {
      return {
        ...state,
        visitedUser: [...state.visitedUser, { id, fullName, clicked }],
      };
    }
  }
};

export default visited_reducer;
