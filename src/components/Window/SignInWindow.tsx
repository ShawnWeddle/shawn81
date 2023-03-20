import { useState } from "react";
import type { FormEventHandler } from "react";
import { usePostContext } from "~/hooks/usePostContext";
import { useAuthContext } from "~/hooks/useAuthContext";
import { api } from "~/utils/api";

const SignInWindow: React.FC = () => {
  const { postState, postDispatch } = usePostContext();
  const { authState, authDispatch } = useAuthContext();
  const user = authState.user;

  const [message, setMessage] = useState<string>("");

  const createPost = api.post.createPost.useMutation();

  if (!user) {
    postDispatch({
      type: "CHANGE",
      payload: {
        windowMode: "rules",
        activePost: postState.activePost,
        posts: postState.posts,
      },
    });
    return <></>;
  }

  return <></>;
};

export default SignInWindow;
