/* eslint-disable */
import { useState } from "react";
import type { FormEventHandler } from "react";
import { useRouter } from "next/router";
import { api, setToken } from "~/utils/api";
import { useAuthContext } from "../../hooks/useAuthContext";

const LogInForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { authState, authDispatch } = useAuthContext();
  const user = authState.user;

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    logInUser.mutate(
      {
        username: username,
        password: password,
      },
      {
        onSuccess(data, variables, context) {
          authDispatch({
            type: "LOGIN",
            payload: {
              token: data.token,
              userId: data.user.userId,
              username: data.user.username,
            },
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              token: data.token,
              userId: data.user.userId,
              username: data.user.username,
            })
          );
          setToken(data.token);
          void router.push("/");
        },
      }
    );
  };

  const logInUser = api.user.logInUser.useMutation();

  if (user) {
    return (
      <div className="flex justify-center">
        <div>
          <p className="m-4 max-w-md text-center text-4xl text-zinc-50">
            {user.username}
          </p>
          <p className="max-w-sm text-xl text-zinc-50">
            It appears you are already logged in as {user.username}. If you
            would like to log in under a different account, please log out
            first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 sm:m-4 sm:max-w-xl sm:rounded sm:border-2 sm:border-zinc-50"
      >
        <p className="mt-2 text-center text-4xl text-zinc-50">LOG IN</p>
        <div className="m-5 grid grid-cols-2">
          <p className="text-lg text-zinc-50">Username</p>
          <input
            className="my-1 rounded-md border-2 border-zinc-50 bg-zinc-800 text-zinc-50"
            type="text"
            placeholder=" Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <p className="text-lg text-zinc-50">Password</p>
          <input
            className="my-1 rounded-md border-2 border-zinc-50 bg-zinc-800 text-zinc-50"
            type={showPassword ? "text" : "password"}
            placeholder=" Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div></div>
          <div className="flex justify-center">
            <input
              className="m-0.5"
              type="checkbox"
              checked={showPassword}
              onChange={(e) => {
                if (e.target.checked) {
                  setShowPassword(true);
                } else {
                  setShowPassword(false);
                }
              }}
            />
            <p className="text-sm text-zinc-100">Show Password</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={logInUser.isLoading}
            className="mb-2 rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg text-zinc-50 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
