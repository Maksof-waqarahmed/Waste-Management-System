import { createTRPCRouter, publicProcedure } from "./trpc";
import { userAuth } from "./router/userAuth";
const appRouter = createTRPCRouter({
  userAuth: userAuth,
});

export type AppRouter = typeof appRouter;
export { appRouter };
