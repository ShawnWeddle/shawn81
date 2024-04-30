import { useState } from "react";
import type { FormEventHandler } from "react";
import { useRouter } from "next/router";
import { usePostContext } from "~/hooks/usePostContext";
import { useAuthContext } from "~/hooks/useAuthContext";
import { api } from "~/utils/api";
import { createPostSchema } from "~/server/api/post/schema";

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
  const [updatePostErrors, setUpdatePostErrors] = useState<string[]>([]);

  const router = useRouter();

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

    const postValidation = createPostSchema.safeParse({
      username: user.username,
      message: message,
      location: activePost.location,
      userId: user.userId,
    });

    if (postValidation.success) {
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
          onError(error) {
            setUpdatePostErrors([
              "Sorry, I don't know why you're seeing this error",
            ]);
          },
        }
      );
    } else {
      const postValidationErrors = postValidation.error.issues.map((error) => {
        return error.message;
      });
      setUpdatePostErrors(postValidationErrors);
    }
  };

  const updatePostErrorsList = updatePostErrors.map((error, index) => {
    return (
      <p
        className="max m-2 bg-site-red/50 p-1 text-center text-lg text-white"
        key={index}
      >
        {error}
      </p>
    );
  });

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="mx-4 my-2 flex justify-between text-2xl">
        <span>{activePost.location}</span>
        <span>{user.username}</span>
        {props.page === "HOME" ? (
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
        ) : (
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
              void router.push("/");
            }}
          >
            ⮌
          </button>
        )}
      </div>
      <textarea
        placeholder="Please type your message here"
        rows={4}
        className="m-2 bg-white text-black"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <div
        className={
          message.length < 1 || message.length > 500
            ? "mr-2 text-right text-lg text-site-red"
            : "mr-2 text-right text-lg text-white"
        }
      >
        {message.length}/500
      </div>
      <div className="flex justify-center gap-2">
        <button className="rounded-lg border-2 border-white bg-site-gray-dark p-1 text-lg hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-blue">
          Cancel
        </button>
        <button
          type="submit"
          disabled={updatePost.isLoading}
          className="hover:to-pink-800 rounded-lg border-2 border-white bg-site-gray-dark p-1 text-lg hover:bg-gradient-to-br hover:from-site-gray-dark"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateWindow;
