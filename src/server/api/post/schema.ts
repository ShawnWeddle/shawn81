import { number, object, string } from 'zod';
import type { TypeOf } from "zod";

export const createPostSchema = object({
  username: string({ required_error: 'Name is required' })
    .min(3, 'Username must be more than 3 characters')
    .max(32, 'Username must be less than 32 characters')
    .regex(/^[a-zA-Z0-9_]*$/, "Username must only contain letters, numbers, and underscores"),
  message: string({ required_error: 'Message is required' })
    .min(1, "Message must contain at least one character")
    .max(500, "Message must be no more than 500 characters"),
  location: number({required_error: "Location is required"})
    .min(0, "Location is out of range")
    .max(80, "Location is out of range"),
  userId: string({ required_error: 'UserId is required' })
});

export const deletePostSchema = number()
  .min(0, "Location is out of range")
  .max(80, "Location is out of range");


export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type DeletePostInput = TypeOf<typeof deletePostSchema>;
