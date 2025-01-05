import { initTRPC, TRPCError } from "@trpc/server";
import prisma from "../../../prisma/db";
import { ZodError } from "zod";
import { parse } from "cookie";
import { verifyJWT } from "@/lib/services/jwt";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const cookieHeader = opts.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.authToken;

  let user = null;
  if (token) {
    try {
      user = await verifyJWT(token);
    } catch (err) {
      console.error("Invalid or expired token:", err);
    }
  }

  return {
    user,
    prisma,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User is not authenticated.",
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);
