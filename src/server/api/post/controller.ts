import { createPost, findAllPosts, updatePost, deletePost } from "./service";
import type { CreatePostInput } from "./schema";

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

export const updatePostHandler = async ({
  input
}: {
  input: CreatePostInput;
}) => {
  try {
    const post = await updatePost({
      username: input.username,
      location: input.location,
      message: input.message,
      user: {
        connect: {
          id: input.userId
        }
      }
    }, {
      location: input.location
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

export const deletePostHandler = async ({
  input
}: {
  input: number;
}) => {
  try {
    await deletePost({
      location: input
    });

    return {
      status: 'success'
    };
  } catch (err) {
    throw err;
  }
};