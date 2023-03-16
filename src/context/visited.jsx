import { createContext, useContext, useReducer, useEffect } from "react";
import visited_reducer from "../reducer/visited_slicer";

const initialState = {
  visitedUser: [],
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(visited_reducer, initialState);

  const onUserClick = (id, item) => {
    dispatch({ type: "VISITED_USER", payload: { id, item } });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        onUserClick,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
