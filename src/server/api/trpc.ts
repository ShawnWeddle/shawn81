
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "~/server/db";

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { verifyJwt } from "./auth";

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  const { req, res } = _opts;
  return ({
    req, res, prisma
  });
};



const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const requireUserAuth = t.middleware(({ ctx, next }) => {

  const {req, res} = ctx;

  const token = req.cookies.token;

  if(!token){
    throw new TRPCError({code: "UNAUTHORIZED"});
  }

  const tokenIsVerified = verifyJwt(token);
  console.log(tokenIsVerified);
  
  return next({
    ctx: {
      body: tokenIsVerified.decoded
    }
  });
});

export const privateProcedure = t.procedure.use(requireUserAuth);
