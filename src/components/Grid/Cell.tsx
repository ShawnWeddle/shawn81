import { usePostContext } from "../../hooks/usePostContext";
import type { PostDocument, UnoccupiedPostType } from "../../data/data";

interface MainCellProps {
  postProperties: PostDocument | UnoccupiedPostType;
}

const MainCell: React.FC<MainCellProps> = (props: MainCellProps) => {
  const { postState, postDispatch } = usePostContext();
  if (postState.posts) {
  }
  return (
    <div
      onClick={() => {
        postDispatch({
          type: "CHANGE",
          payload: {
            windowMode: "create",
            activePost: props.postProperties,
            posts: postState.posts,
          },
        });
      }}
      className={
        props.postProperties._id === "NoID"
          ? "flex aspect-square items-center justify-center rounded bg-zinc-800 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-red-800"
          : "flex aspect-square items-center justify-center rounded bg-zinc-800 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800"
      }
    >
      {props.postProperties.location}
    </div>
  );
};

export default MainCell;
