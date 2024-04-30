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
  const [logInErrors, setLogInErrors] = useState<string[]>([]);

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
        onSuccess(data) {
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
        onError(error) {
          setLogInErrors(["Invalid username or password"]);
        },
      }
    );
  };

  const logInUser = api.user.logInUser.useMutation();

  if (user) {
    return (
      <div className="flex justify-center">
        <div>
          <p className="m-4 max-w-md text-center text-4xl text-white">
            {user.username}
          </p>
          <p className="max-w-sm text-xl text-white">
            It appears you are already logged in as {user.username}. If you
            would like to log in under a different account, please log out
            first.
          </p>
        </div>
      </div>
    );
  }

  const logInErrorList = logInErrors.map((error, index) => {
    return (
      <p
        className="max m-2 bg-red-500/50 text-center text-lg text-white"
        key={index}
      >
        {error}
      </p>
    );
  });

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-site-gray-dark sm:m-4 sm:max-w-xl sm:rounded sm:border-2 sm:border-white"
      >
        <p className="mt-2 text-center text-4xl text-white">LOG IN</p>
        <div className="m-5 grid grid-cols-2">
          <p className="text-lg text-white">Username</p>
          <input
            className="my-1 rounded-md border-2 border-white bg-site-gray-dark text-white"
            type="text"
            placeholder=" Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <p className="text-lg text-white">Password</p>
          <input
            className="my-1 rounded-md border-2 border-white bg-site-gray-dark text-white"
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
            <p className="text-sm text-white">Show Password</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={logInUser.isLoading}
            className="mb-2 rounded-lg border-2 border-white bg-site-gray-dark p-1 text-lg text-white hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-blue"
          >
            Log In
          </button>
        </div>
        {logInErrors && <div>{logInErrorList}</div>}
      </form>
    </div>
  );
};

export default LogInForm;
