import { createPost, findAllPosts } from "./service";
import type { CreatePostInput } from "./schema";

export const createPostHandler = async ({
  input
}: {
  input: CreatePostInput;
}) => {
  try {
    const post = await createPost({
      username: input.username,
      location: input.location,
      message: input.message,
      user: {
        connect: {
          id: input.userId
        }
      }
    });

    return {
      status: 'success',
      data: {
        post
      },
    };
  } catch (err) {
    throw err;
  }
};

export const getAllPostsHandler = async () => {
  try {
    const posts = await findAllPosts();

    return {
      posts
    }
  } catch (err) {
    throw err;
  }
}