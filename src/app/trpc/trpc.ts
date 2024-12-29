import { initTRPC, TRPCError } from "@trpc/server";
import prisma from "../../../prisma/db";
import { ZodError } from "zod";
import { parse } from "cookie";
import { verifyJWT } from "@/lib/services/jwt";

export const createTRPCContext = async (opts: {
  headers: Headers;
  req: Request;
}) => {
  const cookieHeader = opts.req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.authToken;
  let user = null;

  if (token) {
    try {
      user = verifyJWT(token);
    } catch (err) {
      console.error("Invalid or expired token");
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

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { user: ctx.user },
    },
  });
});
