import { initTRPC, TRPCError } from "@trpc/server";
// import { getSession } from "./session"; // Your session handler
import prisma from "../../../prisma/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

const t = initTRPC.create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

// export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
//   if (!ctx.session?.user) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }
//   return next({
//     ctx: {
//       session: { ...ctx.session, user: ctx.session.user },
//       prisma,  // Include Prisma client in context
//     },
//   });
// });

export const createTRPCContext = async (opts: {
  headers: Headers;
  // session: Session | null;
}) => {
  // const session = opts.session ?? (await auth());
  const source = opts.headers.get("x-trpc-source") ?? "unknown";
  const portal = opts.headers.get("portal") ?? "unknown";

  return {
    // session,
    prisma,
  };
};

const trpc = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});
