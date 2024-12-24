import { userAuth } from "./routes/userAuth";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  userAuth: userAuth,
});

export type AppRouter = typeof appRouter;
