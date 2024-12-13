import { userAuth } from "./routes/userAuth";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  userAuth: userAuth,
  hello: publicProcedure.query(() => "Hello World"),
});

export type AppRouter = typeof appRouter;
