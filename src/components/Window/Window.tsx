import { useAuthContext } from "~/hooks/useAuthContext";
import { usePostContext } from "../../hooks/usePostContext";

import RulesWindow from "./RulesWindow";
import CreateWindow from "./CreateWindow";
import UpdateWindow from "./UpdateWindow";
import DisplayWindow from "./DisplayWindow";

const Window: React.FC = () => {
  const { postState, postDispatch } = usePostContext();
  const { authState, authDispatch } = useAuthContext();
  return (
    <div className="w-full gap-1 bg-site-gray-dark p-1 text-white sm:m-4 sm:max-w-xl sm:rounded lg:max-w-md lg:bg-site-gray-med">
      {postState.windowMode === "rules" && <RulesWindow />}
      {postState.windowMode === "create" &&
        postState.activePost &&
        authState.user && <CreateWindow page="HOME" />}
      {postState.windowMode === "edit" &&
        postState.activePost &&
        authState.user && <UpdateWindow page="HOME" />}
      {postState.windowMode === "display" && postState.activePost && (
        <DisplayWindow page="HOME" />
      )}
    </div>
  );
};

export default Window;
