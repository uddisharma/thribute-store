import React, { createContext, useContext, useReducer, useEffect } from 'react';

// const initialState: any = {
//   user: JSON.parse(localStorage.getItem('seller') as string) || null,
// };

const initialState: any = {
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('onboarding') as string) || null
      : null,
};

const UserContext = createContext(initialState);

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    localStorage.setItem('onboarding', JSON.stringify(state.user));
  }, [state.user]);

  const setUser = (user: any) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('onboarding');
  };

  const value = { state, setUser, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
