"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { useLocalStorage } from "react-use";

interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  shippingAddress: any;
}

interface UserState {
  user: User | null;
}

type UserAction = { type: "SET_USER"; payload: User } | { type: "LOGOUT_USER" };

interface UserContextProps {
  userState: UserState;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER":
      return { user: action.payload };
    case "LOGOUT_USER":
      return { user: null };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userState, dispatch] = useReducer(userReducer, { user: null });
  const [storedUser, setStoredUser] = useLocalStorage<User | null>(
    "user",
    null
  );

  useEffect(() => {
    if (storedUser) {
      dispatch({ type: "SET_USER", payload: storedUser });
    }
  }, []);

  const setUser = (user: User) => {
    dispatch({ type: "SET_USER", payload: user });
    setStoredUser(user);
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    setStoredUser(null);
  };

  return (
    <UserContext.Provider value={{ userState, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
