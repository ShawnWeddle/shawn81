import { createPostSchema } from "../post/schema";
import { createPostHandler, getAllPostsHandler } from "../post/controller";

import { createTRPCRouter, publicProcedure, privateProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  createPost: privateProcedure
  .input(createPostSchema)
  .mutation(({ input }) => createPostHandler({ input })),

  getAllPosts: publicProcedure
  .query(() => getAllPostsHandler())
}
);