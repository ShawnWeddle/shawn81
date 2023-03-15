import bcrypt from "bcrypt";
import { createUser, findUser, signJwt} from "./service.js";
import type { CreateUserInput, LoginUserInput } from "./schema.js";
import { TRPCError } from "@trpc/server";

export const registerHandler = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await createUser({
      username: input.username,
      password: hashedPassword
    });

    return {
      status: 'success',
      data: {
        user,
      },
    };
  } catch (err) {
    throw err;
  }
};

export const loginHandler = async ({
  input
}: {
  input: LoginUserInput
}) => {
  try {
    // Get the user from the collection
    const user = await findUser({ username: input.username });

    // Check if user exist and password is correct
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid email or password',
      });
    }

    const token = signJwt({...user}, { expiresIn: "1d" });

    // Send Access Token
    return {
      status: 'success',
      token,
    };
  } catch (err) {
    throw err;
  }
};