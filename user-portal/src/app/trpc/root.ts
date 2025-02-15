import { leaderBoard } from "./routes/leaderBoard";
import { reportWaste } from "./routes/reportWaste";
import { userAuth } from "./routes/userAuth";
import { userProfile } from "./routes/userProfile";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  userAuth: userAuth,
  wasteSubmit: reportWaste,
  leaderBoard: leaderBoard,
  userProfile: userProfile,
});

export type AppRouter = typeof appRouter;
