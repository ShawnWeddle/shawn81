import { useState } from "react";
import type { FormEventHandler } from "react";
import { api } from "../../utils/api";
import { createUserSchema } from "~/server/api/auth/schema";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [signUpErrors, setSignUpErrors] = useState<string[]>([]);

  const registerUser = api.user.registerUser.useMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const userValidation = createUserSchema.safeParse({
      username: username,
      password: password,
      passwordConfirm: passwordConfirmation,
    });
    if (userValidation.success) {
      registerUser.mutate(
        {
          username: username,
          password: password,
          passwordConfirm: passwordConfirmation,
        },
        {
          onSuccess() {
            setSignUpErrors([]);
            setIsSignedUp(true);
          },
          onError(error) {
            setSignUpErrors(["This username is already taken"]);
          },
        }
      );
    } else {
      const userValidationErrors = userValidation.error.issues.map((error) => {
        return error.message;
      });
      setSignUpErrors(userValidationErrors);
    }
  };

  const signUpErrorList = signUpErrors.map((error, index) => {
    return (
      <p
        className="max m-2 bg-red-500/50 text-center text-lg text-zinc-50"
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
          {isSignedUp ? (
            <div>
              <p className="max m-2 text-center text-lg text-zinc-50">
                Thank you for signing up!
              </p>
              <p className="max m-2 text-center text-lg text-zinc-50">
                Please Log In to post a message
              </p>
            </div>
          ) : (
            <button
              type="submit"
              disabled={registerUser.isLoading}
              className="mb-2 rounded-lg border-2 border-zinc-50 bg-zinc-800 p-1 text-lg text-zinc-50 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-blue-800"
            >
              Sign Up
            </button>
          )}
        </div>
        {signUpErrors && <div>{signUpErrorList}</div>}
      </form>
    </div>
  );
};

export default SignUpForm;
