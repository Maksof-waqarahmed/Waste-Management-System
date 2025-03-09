import { leaderBoard } from "./routes/leaderBoard";
import { userNotification } from "./routes/notifications";
import { reportWaste } from "./routes/reportWaste";
import { userAuth } from "./routes/userAuth";
import { userProfile } from "./routes/userProfile";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  userAuth: userAuth,
  wasteSubmit: reportWaste,
  leaderBoard: leaderBoard,
  userProfile: userProfile,
  notification: userNotification
});

export type AppRouter = typeof appRouter;
