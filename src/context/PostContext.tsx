/* eslint-disable */
import { createContext, useReducer } from "react";
import type { UnoccupiedPostType } from "../data/data";
import type { Post } from "@prisma/client";
import { basePostArray } from "../data/data";

export const PostContext = createContext<ContextType | null>(null);

type ContextType = {
  postState: PostReducerState;
  postDispatch: React.Dispatch<PostReducerAction>;
};

type PostContextProviderProps = {
  children: React.ReactNode;
};

type PostReducerState = {
  windowMode: "rules" | "display" | "edit" | "create";
  activePost: Post | UnoccupiedPostType | null;
  posts: (Post | UnoccupiedPostType)[];
};
type PostReducerAction = {
  type: "CHANGE";
  payload: PostReducerState;
};

export const postReducer = (
  state: PostReducerState,
  action: PostReducerAction
) => {
  switch (action.type) {
    case "CHANGE":
      return {
        windowMode: action.payload.windowMode,
        activePost: action.payload.activePost,
        posts: action.payload.posts,
      };

    default:
      return state;
  }
};

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [postState, postDispatch] = useReducer(postReducer, {
    windowMode: "rules",
    activePost: { id: "NoID", username: "", message: "", location: -1 },
    posts: basePostArray(),
  });

  return (
    <PostContext.Provider value={{ postState, postDispatch }}>
      {children}
    </PostContext.Provider>
  );
};
