import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  post: postRouter
});

export type AppRouter = typeof appRouter;
