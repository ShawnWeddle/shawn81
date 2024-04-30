import { IoPerson } from "react-icons/io5";

interface UsernameButtonProps {
  username: string;
}

const UsernameButton: React.FC<UsernameButtonProps> = (
  props: UsernameButtonProps
) => {
  return (
    <>
      <button className="rounded-lg border-2 border-white bg-site-gray-dark p-1 text-2xl text-white hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-blue sm:hidden">
        <IoPerson />
      </button>
      <button className="hidden rounded-lg border-2 border-white bg-site-gray-dark p-1 text-2xl text-white hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-blue sm:block sm:text-3xl">
        {props.username}
      </button>
    </>
  );
};

export default UsernameButton;
