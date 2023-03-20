import { useState } from "react";
import type { FormEventHandler } from "react";
import { usePostContext } from "~/hooks/usePostContext";
import { useAuthContext } from "~/hooks/useAuthContext";
import { api } from "~/utils/api";

interface InnerWindowProps {
  username: string;
  message: string;
  location: number;
  page: string;
}

const DisplayWindow: React.FC<InnerWindowProps> = (props: InnerWindowProps) => {
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    createPost.mutate(
      {
        username: props.username,
        message: message,
        location: props.location,
        userId: user.userId,
      },
      {
        onSuccess: () => {
          postDispatch({
            type: "CHANGE",
            payload: {
              windowMode: "display",
              activePost: postState.activePost,
              posts: postState.posts,
            },
          });
        },
      }
    );
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="mx-4 my-2 flex justify-between text-2xl">
        <span>{props.location}</span>
        <span>{props.username}</span>
        <button
          type="button"
          onClick={() => {
            postDispatch({
              type: "CHANGE",
              payload: {
                windowMode: "rules",
                activePost: postState.activePost,
                posts: postState.posts,
              },
            });
          }}
        >
          ✕
        </button>
      </div>
      <textarea
        placeholder="Please type your message here"
        rows={4}
        className="m-2 bg-zinc-50 text-black"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={createPost.isLoading}
          className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DisplayWindow;
