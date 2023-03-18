import { api } from "../../utils/api";
import { usePostContext } from "../../hooks/usePostContext";
import MainCell from "./Cell";

const MainGrid: React.FC = () => {
  const { postState, postDispatch } = usePostContext();
  const activePosts = postState.posts;

  const getAllPosts = api.postRouter.getall.useQuery();

  const Cells = activePosts.map((post, index) => (
    <MainCell postProperties={post} key={index} />
  ));

  return (
    <div className="grid w-full grid-cols-9 gap-1 bg-zinc-700 p-1 text-zinc-50 sm:m-4 sm:max-w-xl sm:rounded">
      {Cells}
    </div>
  );
};

export default MainGrid;
