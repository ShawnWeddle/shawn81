import { useRouter } from "next/router";

const LogInButton: React.FC = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/login")}
      className="rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-2xl text-zinc-50 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800 sm:text-3xl"
    >
      Log In
    </button>
  );
};

export default LogInButton;
