import { useState } from "react";
import type { FormEventHandler } from "react";
import { api } from "../../utils/api";
import { usePostContext } from "../../hooks/usePostContext";

const Window: React.FC = () => {
  const { postState, postDispatch } = usePostContext();
  return (
    <div className="w-full gap-1 bg-zinc-800 p-1 text-zinc-50 sm:m-4 sm:max-w-xl sm:rounded lg:max-w-md lg:bg-zinc-700">
      {postState.windowMode === "rules" && <RulesWindow />}
      {postState.windowMode === "create" && postState.activePost && (
        <CreateWindow
          username="ShawnWedd"
          location={postState.activePost.location}
          message=""
          page="home"
        />
      )}
      {postState.windowMode === "edit" && postState.activePost && (
        <UpdateWindow
          username="ShawnWeddit"
          location={postState.activePost.location}
          message=""
          page="home"
        />
      )}
    </div>
  );
};

export default Window;

const RulesWindow: React.FC = () => {
  return (
    <div className="flex flex-col">
      <p className="m-2 text-center text-2xl">
        Thank you for visiting{" "}
        <span className="text-blue-600">shawn81.com!</span>
      </p>
      <p className="mx-4 my-2">
        This website displays up to eighty-one (81) messages at a time.
      </p>
      <p className="mx-4 my-2">
        Click on a square to see the message it contains.
      </p>
      <p className="mx-4 my-2">
        Accounts can only post one message, so make it worth it.
      </p>
      <p className="mx-4 my-2">Please only make one account per person.</p>
      <p className="mx-4 my-2">
        I reserve the right to delete any messages I wish at any time.
      </p>
    </div>
  );
};

interface InnerWindowProps {
  username: string;
  message: string;
  location: number;
  page: string;
}

const CreateWindow: React.FC<InnerWindowProps> = (props: InnerWindowProps) => {
  const { postState, postDispatch } = usePostContext();

  const [message, setMessage] = useState<string>("");

  /*const { mutate } = api.postRouter.createPost.useMutation();*/

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    /*mutate({
      username: props.username,
      message: message,
      location: props.location,
    });*/
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
          className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const UpdateWindow: React.FC<InnerWindowProps> = (props: InnerWindowProps) => {
  const { postState, postDispatch } = usePostContext();

  const [message, setMessage] = useState<string>(
    postState.activePost?.message || ""
  );

  /*const { mutate } = api.postRouter.createPost.useMutation();*/

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    /*mutate({
      username: props.username,
      message: message,
      location: props.location,
    });*/
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
          className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
