import jwt from "jsonwebtoken";
import { env } from "../../../env.mjs";

import { prisma } from "../../db.js";
import type { Prisma, User } from '@prisma/client';

const privateKey = env.PRIVATE_KEY;
const publicKey = env.PUBLIC_KEY;

export function signJwt(
  object: object, 
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256"
  })
}

export function verifyJwt(token: string){
  try{
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded
    }
  }catch(error){
    return {
      valid: false,
      expired: true,
      decoded: null
    }
  }
}

export const createUser = async (input: Prisma.UserCreateInput) => {
  return prisma.user.create({
    data: input,
  });
};

export const findUser = async (
  where: Prisma.UserWhereInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findUnique({
    where,
    select,
  })) as User;
};