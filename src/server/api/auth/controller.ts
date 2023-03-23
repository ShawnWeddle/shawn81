import bcrypt from "bcrypt";
import { createUser, findUser, findUniqueUser, signJwt} from "./service";
import type { CreateUserInput, LoginUserInput } from "./schema";
import { TRPCError } from "@trpc/server";

export const registerHandler = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {
    const userAlreadyExists = await findUniqueUser({ username: input.username });

    if(userAlreadyExists){
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: 'Username is already taken',
      });
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await createUser({
      username: input.username,
      password: hashedPassword
    });

    return {
      status: 'success',
      data: {
        user
      },
    };
  } catch (error) {
    throw error;
  }
};

export const loginHandler = async ({
  input
}: {
  input: LoginUserInput
}) => {
  try {
    const user = await findUser({ username: input.username });

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid email or password',
      });
    }

    const token = signJwt({...user});

    return {
      status: 'success',
      token,
      user: {username: user.username, userId: user.id}
    };
  } catch (error) {
    throw error;
  }
};