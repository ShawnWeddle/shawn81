import { createUserSchema, loginUserSchema } from "../auth/schema";
import { registerHandler, loginHandler } from "../auth/controller";

import { createTRPCRouter, publicProcedure, privateProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
  .input(createUserSchema)
  .mutation(({ input }) => registerHandler({ input })),

  logInUser: publicProcedure
  .input(loginUserSchema)
  .mutation(({input}) => loginHandler({input}))
}
);