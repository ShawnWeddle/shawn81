import { useAuthContext } from "~/hooks/useAuthContext";
import { usePostContext } from "~/hooks/usePostContext";
import { useRouter } from "next/router";

const LogOutButton: React.FC = () => {
  const { authDispatch } = useAuthContext();
  const { postState, postDispatch } = usePostContext();

  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    authDispatch({ type: "LOGOUT", payload: null });
    postDispatch({
      type: "CHANGE",
      payload: {
        windowMode: "rules",
        activePost: postState.activePost,
        posts: postState.posts,
      },
    });
    void router.push("/");
  };

  return (
    <button
      onClick={() => {
        handleLogOut();
      }}
      className="rounded-lg border-2 border-white bg-site-gray-dark p-1 text-2xl text-white hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-blue sm:text-3xl"
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
