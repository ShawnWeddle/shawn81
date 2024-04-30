import { useRouter } from "next/router";

const SignUpButton: React.FC = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => void router.push("/signup")}
      className="rounded-lg border-2 border-white bg-site-gray-dark
       p-1 text-2xl text-white hover:bg-gradient-to-br hover:from-site-gray-dark
       hover:to-site-blue sm:text-3xl"
    >
      Sign Up
    </button>
  );
};

export default SignUpButton;
