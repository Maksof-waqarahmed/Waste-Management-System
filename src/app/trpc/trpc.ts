import { initTRPC, TRPCError } from "@trpc/server";
import prisma from "../../../prisma/db";
import { Session } from "../trpc/auth/user/index";
import { ZodError } from "zod";

export const createTRPCContext = async (opts: {
  headers: Headers;
  // session: Session | null;
}) => {
  // const session = opts.session;

  return {
    // session,
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

// export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
//   if (!ctx.session?.user) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }
//   return next({
//     ctx: {
//       // infers the `session` as non-nullable
//       session: { ...ctx.session, user: ctx.session.user },
//     },
//   });
// });
