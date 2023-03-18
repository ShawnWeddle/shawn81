
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { prisma } from "~/server/db";

import { initTRPC, TRPCError } from "@trpc/server";
import type { inferAsyncReturnType } from "@trpc/server";
import superjson from "superjson";
import { verifyJwt } from "./auth/service";

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  const { req, res } = _opts;
  return ({
    req, res, prisma
  });
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>; 

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const requireUserAuth = t.middleware(({ ctx, next }) => {
  const {req} = ctx;
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    throw new TRPCError({code: "UNAUTHORIZED"});
  }

  const tokenIsVerified = verifyJwt(token);

  if(!tokenIsVerified.valid){
    throw new TRPCError({code: "UNAUTHORIZED"});
  }
  
  return next({
    ctx: {
      token: tokenIsVerified.decoded
    }
  });
});

export const privateProcedure = t.procedure.use(requireUserAuth);
