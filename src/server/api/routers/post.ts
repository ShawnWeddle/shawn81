import { createPostSchema, deletePostSchema } from "../post/schema";
import { createPostHandler, getAllPostsHandler, updatePostHandler, deletePostHandler } from "../post/controller";

import { createTRPCRouter, publicProcedure, privateProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  createPost: privateProcedure
  .input(createPostSchema)
  .mutation(({ input }) => createPostHandler({ input })),

  getAllPosts: publicProcedure
  .query(() => getAllPostsHandler()),

  updatePost: privateProcedure
  .input(createPostSchema)
  .mutation(({input}) => updatePostHandler({input})),

  deletePost: privateProcedure
  .input(deletePostSchema)
  .mutation((input) => deletePostHandler(input))
}
);