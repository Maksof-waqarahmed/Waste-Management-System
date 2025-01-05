import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../../trpc";

const wasteTypeEnum = z.enum([
  "PLASTIC",
  "PAPER",
  "METAL",
  "GLASS",
  "ELECTRONIC",
]);

export const reportWaste = createTRPCRouter({
  submitWaste: protectedProcedure
    .input(
      z.object({
        location: z.string(),
        wasteType: wasteTypeEnum,
        estimatedAmount: z.number(),
        weight: z.number(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //@ts-ignore
      const userId = ctx.user.id;
      const validatedWasteType = wasteTypeEnum.parse(input.wasteType);
      const rewardPoints = input.weight * 10;

      const reportedWaste = await ctx.prisma.reports.create({
        data: {
          location: input.location,
          wasteType: validatedWasteType,
          amount: input.estimatedAmount,
          imgURL: input.image,
          status: "COMPLETED",
          userId: userId,
        },
      });

      const reward = await ctx.prisma.rewards.create({
        data: {
          userId: userId,
          points: rewardPoints,
          reportId: reportedWaste.id,
        },
      });

      let leaderBoardEntry = await ctx.prisma.leaderboard.findFirst({
        where: { userId: userId },
      });

      if (leaderBoardEntry) {
        leaderBoardEntry = await ctx.prisma.leaderboard.update({
          where: { id: leaderBoardEntry.id },
          data: {
            score: leaderBoardEntry.score + rewardPoints,
          },
        });
      } else {
        leaderBoardEntry = await ctx.prisma.leaderboard.create({
          data: {
            userId: userId,
            score: rewardPoints,
          },
        });
      }

      const sortedLeaderboard = await ctx.prisma.leaderboard.findMany({
        orderBy: {
          score: "desc",
        },
      });

      const userRank =
        sortedLeaderboard.findIndex((entry) => entry.userId === userId) + 1;

      return {
        data: reportedWaste,
        reward: reward,
        userRank: userRank,
        message: "Waste Submitted Successfully and Leaderboard Updated",
        code: 200,
      };
    }),

  // markAsCompleted: protectedProcedure
  //   .input(
  //     z.object({
  //       reportId: z.string(),
  //       userId: z.string(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const updatedReport = await ctx.prisma.reports.update({
  //       where: { id: input.reportId },
  //       data: { status: "COMPLETED" },
  //     });

  //     const reward = await ctx.prisma.rewards.create({
  //       data: {
  //         points: 10,
  //         weight: ,
  //         userId: input.userId,
  //         reportId: input.reportId,
  //       },
  //     });

  //     return {
  //       message: "Report marked as completed and reward granted",
  //       code: 200,
  //     };
  //   }),

  getRecentReports: protectedProcedure.query(async ({ ctx }) => {
    const recentReports = await ctx.prisma.reports.findMany({
      select: {
        location: true,
        wasteType: true,
        amount: true,
        createdAt: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { data: recentReports, code: 200 };
  }),
});
