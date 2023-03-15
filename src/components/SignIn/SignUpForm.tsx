import { useState } from "react";
import type { FormEventHandler } from "react";
import { api } from "../../utils/api";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Sign Up");
    if (checkUser.data) {
      console.log("User already exists");
    } else {
      console.log("You're good fam");
      createUser.mutate({
        username: username,
        password: password,
        passwordConfirmation: passwordConfirmation,
      });
    }
  };

  const checkUser = api.user.getByUsername.useQuery({
    username: username,
  });

  const createUser = api.user.create.useMutation();

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 sm:m-4 sm:max-w-xl sm:rounded sm:border-2 sm:border-zinc-50"
      >
        <p className="mt-2 text-center text-4xl text-zinc-50">SIGN UP</p>
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
          <p className="text-lg text-zinc-50">Confirm Password</p>
          <input
            className="my-1 rounded-md border-2 border-zinc-50 bg-zinc-800 text-zinc-50"
            type={showPassword ? "text" : "password"}
            placeholder=" Confirm password "
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
          />
          <div></div>
          <div className="flex justify-center">
            <input
              id="sign-up-show-password-input"
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
            <label
              htmlFor="sign-up-show-password-input"
              className="text-sm text-zinc-100"
            >
              Show Password
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mb-2 rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg text-zinc-50 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
