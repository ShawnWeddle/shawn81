import { useRouter } from "next/router";

const MainLogo: React.FC = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => void router.push("/")}
      className="rounded-lg border-2 border-white bg-gradient-to-br from-site-gray-dark via-site-pink-dark to-site-blue-dark p-1 text-2xl text-white sm:text-3xl"
    >
      shawn81
    </button>
  );
};

export default MainLogo;
