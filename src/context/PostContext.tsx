import { createContext, useReducer } from "react";
import type { PostDocument, UnoccupiedPostType } from "../data/data";
import { basePostArray } from "../data/data";

export const PostContext = createContext<ContextType | null>(null);

type ContextType = {
  postState: {
    windowMode: "rules" | "display" | "edit" | "create";
    activePost: PostDocument | UnoccupiedPostType | null;
    posts: (PostDocument | UnoccupiedPostType)[];
  };
  postDispatch: React.Dispatch<{
    type: string;
    payload: {
      windowMode: "rules" | "display" | "edit" | "create";
      activePost: PostDocument | UnoccupiedPostType | null;
      posts: (PostDocument | UnoccupiedPostType)[];
    };
  }>;
};

type PostContextProviderProps = {
  children: React.ReactNode;
};

type PostReducerState = {
  windowMode: "rules" | "display" | "edit" | "create";
  activePost: PostDocument | UnoccupiedPostType | null;
  posts: (PostDocument | UnoccupiedPostType)[];
};
type PostReducerAction = {
  type: string;
  payload: {
    windowMode: "rules" | "display" | "edit" | "create";
    activePost: PostDocument | UnoccupiedPostType | null;
    posts: (PostDocument | UnoccupiedPostType)[];
  };
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
    activePost: { _id: "NoID", username: "", message: "", location: -1 },
    posts: basePostArray(),
  });

  return (
    <PostContext.Provider value={{ postState, postDispatch }}>
      {children}
    </PostContext.Provider>
  );
};
