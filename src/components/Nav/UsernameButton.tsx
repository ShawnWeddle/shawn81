import { IoPerson } from "react-icons/io5";

interface UsernameButtonProps {
  username: string;
}

const UsernameButton: React.FC<UsernameButtonProps> = (
  props: UsernameButtonProps
) => {
  return (
    <>
      <button className="rounded-lg border-2 border-zinc-50 bg-gradient-to-br from-blue-800 via-purple-800 to-pink-800 p-1 text-2xl text-zinc-50 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800 sm:hidden">
        <IoPerson />
      </button>
      <button className=" hidden rounded-lg border-2 border-zinc-50 bg-gradient-to-br from-blue-800 via-purple-800 to-pink-800 p-1 text-2xl text-zinc-50 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800 sm:block sm:text-3xl">
        {props.username}
      </button>
    </>
  );
};

export default UsernameButton;
