import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const leaderBoard = createTRPCRouter({
  getLeaderBoard: protectedProcedure
    // .input(
    // //   z.object({
    // //     take: z.number().default(10).optional(),
    // //     skip: z.number().default(0).optional(),
    // //   })
    // )
    .query(async ({ input, ctx }) => {
      //   const { take, skip } = input;
      const leaderboardData = await ctx.prisma.leaderboard.findMany({
        orderBy: {
          score: "desc",
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              profileImg: true,
            },
          },
        },
      });
      return leaderboardData;
    }),
});
