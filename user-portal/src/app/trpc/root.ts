import { reportWaste } from "./routes/reportWaste";
import { userAuth } from "./routes/userAuth";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  userAuth: userAuth,
  wasteSubmit: reportWaste,
});

export type AppRouter = typeof appRouter;
