/* eslint-disable */
import { createContext, useReducer, useEffect } from "react";
import { setToken } from "~/utils/api";
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
    case "LOGIN": {
      if (action.payload) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: action.payload.token,
            userId: action.payload.userId,
            username: action.payload.username,
          })
        );
        setToken(action.payload.token);
      }

      return { user: action.payload };
    }
    case "LOGOUT": {
      localStorage.removeItem("user");
      setToken("");
      return { user: null };
    }
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
      setToken(user.token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
