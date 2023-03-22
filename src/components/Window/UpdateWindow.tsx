import { useState } from "react";
import type { FormEventHandler } from "react";
import { usePostContext } from "~/hooks/usePostContext";
import { useAuthContext } from "~/hooks/useAuthContext";
import { api } from "~/utils/api";

interface InnerWindowProps {
  page: "HOME" | "PROFILE";
}

const UpdateWindow: React.FC<InnerWindowProps> = (props: InnerWindowProps) => {
  const { postState, postDispatch } = usePostContext();
  const { authState, authDispatch } = useAuthContext();
  const user = authState.user;
  const activePost = postState.activePost;

  const [message, setMessage] = useState<string>(
    activePost ? activePost.message : ""
  );

  const updatePost = api.post.updatePost.useMutation();

  if (!user || !activePost) {
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

    updatePost.mutate(
      {
        username: user.username,
        message: message,
        location: activePost.location,
        userId: user.userId,
      },
      {
        onSuccess(data) {
          const newPost = data.data.post;
          const newPosts = postState.posts;
          newPosts[newPost.location] = newPost;
          postDispatch({
            type: "CHANGE",
            payload: {
              windowMode: "display",
              activePost: data.data.post,
              posts: newPosts,
            },
          });
        },
      }
    );
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="mx-4 my-2 flex justify-between text-2xl">
        <span>{activePost.location}</span>
        <span>{user.username}</span>
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
      <div className="flex justify-center gap-2">
        <button className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800">
          Cancel
        </button>
        <button
          type="submit"
          disabled={updatePost.isLoading}
          className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg hover:bg-gradient-to-br hover:from-zinc-800 hover:to-pink-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateWindow;
