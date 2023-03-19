import MainLogo from "./MainLogo";
import SignUpButton from "./SignUpButton";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import UsernameButton from "./UsernameButton";
import { useAuthContext } from "~/hooks/useAuthContext";

const NavBar: React.FC = () => {
  const { authState, authDispatch } = useAuthContext();
  const user = authState.user;
  const username = user ? user.username : "";

  return (
    <nav className="flex justify-between bg-zinc-700">
      <div className="m-4">
        <MainLogo />
      </div>
      <div className="m-4 flex gap-4">
        {!user && <SignUpButton />}
        {!user && <LogInButton />}
        {user && <UsernameButton username={username} />}
        {user && <LogOutButton />}
      </div>
    </nav>
  );
};

export default NavBar;
