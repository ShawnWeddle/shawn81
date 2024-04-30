import { useState } from "react";
import type { FormEventHandler } from "react";
import { newUnoccupiedPost } from "~/data/data";
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
        <span className="text-site-blue">{activePost.username}</span>
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
      <div className="m-2 p-1 text-white">{activePost.message}</div>
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
            className="rounded-lg border-2 border-white bg-site-gray-dark p-1 text-lg hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-blue"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setIsDeletingPost(true);
            }}
            className="rounded-lg border-2 border-white bg-site-gray-dark p-1 text-lg hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-red"
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
              className="rounded-lg border-2 border-white bg-site-gray-dark p-1 text-lg hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-blue"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
              className="rounded-lg border-2 border-white bg-site-gray-dark p-1 text-lg hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-red"
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
