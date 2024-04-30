import { usePostContext } from "../../hooks/usePostContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import type { UnoccupiedPostType } from "../../data/data";
import type { Post } from "@prisma/client";

interface MainCellProps {
  postProperties: Post | UnoccupiedPostType;
}

const MainCell: React.FC<MainCellProps> = (props: MainCellProps) => {
  const { postState, postDispatch } = usePostContext();
  const { authState, authDispatch } = useAuthContext();

  return (
    <div
      onClick={() => {
        if (props.postProperties.id === "NoID") {
          if (authState.user) {
            postDispatch({
              type: "CHANGE",
              payload: {
                windowMode: "create",
                activePost: props.postProperties,
                posts: postState.posts,
              },
            });
          } else {
            postDispatch({
              type: "CHANGE",
              payload: {
                windowMode: "rules",
                activePost: props.postProperties,
                posts: postState.posts,
              },
            });
          }
        } else {
          postDispatch({
            type: "CHANGE",
            payload: {
              windowMode: "display",
              activePost: props.postProperties,
              posts: postState.posts,
            },
          });
        }
      }}
      className={
        props.postProperties.id === "NoID"
          ? "flex aspect-square items-center justify-center rounded bg-site-gray-dark hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-pink"
          : "flex aspect-square items-center justify-center rounded bg-site-gray-med hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-blue"
      }
    >
      {props.postProperties.location}
    </div>
  );
};

export default MainCell;
