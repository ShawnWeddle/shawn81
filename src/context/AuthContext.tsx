/* eslint-disable */
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext<ContextType | null>(null);

type ContextType = {
  authState: AuthReducerState;
  authDispatch: React.Dispatch<AuthReducerAction>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export type UserType = {
  token: string;
  userId: string;
  username: string;
};

type AuthReducerState = { user: UserType | null };
type AuthReducerAction = { type: "LOGIN" | "LOGOUT"; payload: UserType | null };

export const authReducer = (
  state: AuthReducerState,
  action: AuthReducerAction
) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authState, authDispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const userCheck: string | null = localStorage.getItem("user");
    const user: UserType | null = userCheck ? JSON.parse(userCheck) : null;

    if (user) {
      authDispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
