import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../../trpc";
import cloudinary from "@/lib/cloudinary";

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
      const rewardPoints = Number(input.weight * 2);
      const uploadResponse = await cloudinary.v2.uploader.upload(
        input.image,
        {
          folder: "waste_reports",
        },
        (error, result) => {}
      );

      const reportedWaste = await ctx.prisma.reports.create({
        data: {
          location: input.location,
          wasteType: validatedWasteType,
          amount: input.estimatedAmount,
          imgURL: uploadResponse.secure_url,
          status: "COMPLETED",
          userId: userId,
          weight: input.weight,
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
            rank: leaderBoardEntry.rank + 1,
          },
        });
      } else {
        leaderBoardEntry = await ctx.prisma.leaderboard.create({
          data: {
            userId: userId,
            score: rewardPoints,
            rank: 1,
          },
        });
      }

      const notificationMessage = `Your waste submission has been recorded, and you earned ${rewardPoints} points. Check the leaderboard to see your rank!`;
      const notification = await ctx.prisma.notifications.create({
        data: {
          userId: userId,
          message: notificationMessage,
          type: "WASTE_SUBMISSION",
          isRead: false,
        },
      });

      return {
        message:
          "Waste Submitted Successfully, Leaderboard Updated, and Notification Created",
        code: 200,
      };
    }),
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
