import { useState } from "react";
import type { FormEventHandler } from "react";
import { UnoccupiedPostType, newUnoccupiedPost } from "~/data/data";
import { usePostContext } from "~/hooks/usePostContext";
import { useAuthContext } from "~/hooks/useAuthContext";
import { api } from "~/utils/api";

interface InnerWindowProps {
  page: string;
}

const DisplayWindow: React.FC<InnerWindowProps> = (props: InnerWindowProps) => {
  const { postState, postDispatch } = usePostContext();
  const { authState, authDispatch } = useAuthContext();
  const user = authState.user;
  const activePost = postState.activePost;

  const [isDeletingPost, setIsDeletingPost] = useState<boolean>(false);

  if (!activePost) {
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
  };

  const deletePost = api.post.deletePost.useMutation();

  const handleDelete = () => {
    deletePost.mutate(activePost.location, {
      onSuccess(data, variables) {
        const newPost = newUnoccupiedPost(variables);
        const newPosts = postState.posts;
        newPosts[variables] = newPost;
        postDispatch({
          type: "CHANGE",
          payload: {
            windowMode: "create",
            activePost: newPost,
            posts: newPosts,
          },
        });
      },
    });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="mx-4 my-2 flex justify-between text-2xl">
        <span>{activePost.location}</span>
        <span>{activePost.username}</span>
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
      <div className="m-2 h-24 bg-zinc-700 p-1 text-zinc-50">
        {activePost.message}
      </div>
      {activePost.username === user?.username && !isDeletingPost && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              postDispatch({
                type: "CHANGE",
                payload: {
                  windowMode: "edit",
                  activePost: postState.activePost,
                  posts: postState.posts,
                },
              });
            }}
            className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setIsDeletingPost(true);
            }}
            className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg hover:bg-gradient-to-br hover:from-zinc-800 hover:to-red-800"
          >
            Delete
          </button>
        </div>
      )}
      {activePost.username === user?.username && isDeletingPost && (
        <>
          <p className="mb-2 text-center">
            Are you sure you want to delete this post?
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setIsDeletingPost(false);
              }}
              className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
              className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg hover:bg-gradient-to-br hover:from-zinc-800 hover:to-red-800"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default DisplayWindow;
