import { createContext, useContext, useReducer } from "react";
import visited_reducer from "../reducer/visited_slicer";

const initialState = {
  visitedUser: [],
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(visited_reducer, initialState);

  const onUserClick = (id, fullName, clicked) => {
    dispatch({ type: "VISITED_USER", payload: { id, fullName, clicked } });
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
