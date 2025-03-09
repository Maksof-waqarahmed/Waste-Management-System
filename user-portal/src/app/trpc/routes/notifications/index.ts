import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const userNotification = createTRPCRouter({
  getAllNotification: protectedProcedure.query(async ({ ctx }) => {
    //@ts-ignore
    const userId = ctx.user.id;
    const notifications = await ctx.prisma.notifications.findMany({
      where: { userId: userId, isRead: false },
      orderBy: { createdAt: "desc" },
    });
    return { message: "Get All notifications", code: 200, data: notifications };
  }),
  markAllNotificationsAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    //@ts-ignore
    const userId = ctx.user.id;
    await ctx.prisma.notifications.updateMany({
      where: { userId: userId, isRead: false },
      data: { isRead: true },
    });

    return { message: "All notifications marked as read", code: 200 };
  }),
});
