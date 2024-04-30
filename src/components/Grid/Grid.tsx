import { useEffect } from "react";
import { api } from "../../utils/api";
import { usePostContext } from "../../hooks/usePostContext";
import MainCell from "./Cell";
import { EmptyArray } from "~/utils/emptyArray";

const MainGrid: React.FC = () => {
  const { postState, postDispatch } = usePostContext();
  const activePosts = postState.posts;

  const getAllPosts = api.post.getAllPosts.useQuery(undefined, {
    onSuccess(data) {
      const { posts } = data;
      posts.map((item, index) => {
        activePosts[item.location] = item;
      });
      postDispatch({
        type: "CHANGE",
        payload: {
          windowMode: postState.windowMode,
          activePost: postState.activePost,
          posts: activePosts,
        },
      });
    },
  });

  useEffect(() => {
    getAllPosts;
  }, [getAllPosts]);

  const Cells = activePosts.map((post, index) => (
    <MainCell postProperties={post} key={index} />
  ));

  const UnloadedCells = EmptyArray.map((post, index) => (
    <div
      key={index}
      className="flex aspect-square items-center justify-center rounded odd:animate-pop1 even:animate-pop2"
    >
      {index}
    </div>
  ));

  return (
    <div className="grid w-full grid-cols-9 gap-1 bg-site-gray-med p-1 text-white sm:m-4 sm:max-w-xl sm:rounded">
      {getAllPosts.data ? Cells : UnloadedCells}
    </div>
  );
};

export default MainGrid;
