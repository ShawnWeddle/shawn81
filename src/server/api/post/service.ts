import { prisma } from "../../db";
import type { Prisma, Post } from '@prisma/client';

export const createPost = async (input: Prisma.PostCreateInput) => {
  return prisma.post.create({
    data: input,
  });
};

export const findPost = async (
  where: Prisma.PostWhereInput,
  select?: Prisma.PostSelect
) => {
  return (await prisma.post.findFirst({
    where,
    select
  })) as Post;
};

export const findAllPosts = async () => {
  return (await prisma.post.findMany());
} ;

export const findUniquePost = async (
  where: Prisma.PostWhereUniqueInput,
  select?: Prisma.PostSelect
) => {
  return (await prisma.post.findUnique({
    where,
    select
  })) as Post;
};

export const updatePost = async (
  input: Prisma.PostUpdateInput,
  where: Prisma.PostWhereUniqueInput
) => {
  return (await prisma.post.update({
    where,
    data: input
  }))};
  
export const deletePost = async (
  where: Prisma.PostWhereUniqueInput
) => {
  return (await prisma.post.delete({
    where
  }))};