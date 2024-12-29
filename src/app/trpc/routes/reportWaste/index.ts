import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const reportWaste = createTRPCRouter({
  submitWaste: publicProcedure
    .input(
      z.object({
        location: z.string(),
        wasteType: z.string(),
        estimatedAmount: z.number(),
        description: z.string(),
        image: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const reportedWaste = await ctx.prisma.reports.create({
        data: {
          location: input.location,
          wasteType: input.wasteType,
          amount: input.estimatedAmount,
          imgURL: input.image,
          status: "PENDING",
          userId: input.userId,
        },
      });

      return { message: "Waste Submitted Successfully", code: 200 };
    }),

  markAsCompleted: publicProcedure
    .input(
      z.object({
        reportId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedReport = await ctx.prisma.reports.update({
        where: { id: input.reportId },
        data: { status: "COMPLETED" },
      });

      const reward = await ctx.prisma.rewards.create({
        data: {
          points: 10,
          description: "Reward for completing the waste report",
          name: "Waste Completion Reward",
          collectionInfo:
            "Points awarded for reporting and completing waste management",
          userId: input.userId,
          reportId: input.reportId,
        },
      });

      return {
        message: "Report marked as completed and reward granted",
        code: 200,
      };
    }),

  getRecentReports: publicProcedure.query(async ({ ctx }) => {
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
