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
        <p className="mt-2 text-center text-4xl text-white">SIGN UP</p>
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
          <p className="text-lg text-white">Confirm Password</p>
          <input
            className="my-1 rounded-md border-2 border-white bg-site-gray-dark text-white"
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
              className="text-sm text-white"
            >
              Show Password
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          {isSignedUp ? (
            <div>
              <p className="max m-2 text-center text-lg text-white">
                Thank you for signing up!
              </p>
              <p className="max m-2 text-center text-lg text-white">
                Please Log In to post a message
              </p>
            </div>
          ) : (
            <button
              type="submit"
              disabled={registerUser.isLoading}
              className="mb-2 rounded-lg border-2 border-white bg-site-gray-dark p-1 text-lg text-white hover:bg-gradient-to-br hover:from-site-gray-dark hover:to-site-blue"
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
