/* eslint-disable */
import { useState } from "react";
import type { FormEventHandler } from "react";
import { api } from "../../utils/api";
import { useAuthContext } from "~/hooks/useAuthContext";
import { usePostContext } from "../../hooks/usePostContext";

import RulesWindow from "./RulesWindow";
import CreateWindow from "./CreateWindow";
import UpdateWindow from "./UpdateWindow";

const Window: React.FC = () => {
  const { postState, postDispatch } = usePostContext();
  const { authState, authDispatch } = useAuthContext();
  return (
    <div className="w-full gap-1 bg-zinc-800 p-1 text-zinc-50 sm:m-4 sm:max-w-xl sm:rounded lg:max-w-md lg:bg-zinc-700">
      {postState.windowMode === "rules" && <RulesWindow />}
      {postState.windowMode === "create" &&
        postState.activePost &&
        authState.user && <CreateWindow page="HOME" />}
      {postState.windowMode === "edit" &&
        postState.activePost &&
        authState.user && (
          <UpdateWindow
            username={authState.user.username}
            location={postState.activePost.location}
            message=""
            page="HOME"
          />
        )}
      {postState.windowMode === "display" && postState.activePost && (
        <UpdateWindow
          username={postState.activePost.username}
          location={postState.activePost.location}
          message={postState.activePost.message}
          page="home"
        />
      )}
    </div>
  );
};

export default Window;
