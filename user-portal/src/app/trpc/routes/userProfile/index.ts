import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const userProfile = createTRPCRouter({
  updateUsetProfile: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        profileImg: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //@ts-ignore
      const userId = ctx.user.id;
      const { firstName, lastName, profileImg } = input;
      return ctx.prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          firstName,
          lastName,
          profileImg,
        },
      });
    }),
});
