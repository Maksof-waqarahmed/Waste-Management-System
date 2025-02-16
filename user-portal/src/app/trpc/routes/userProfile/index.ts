import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import cloudinary from "@/lib/cloudinary";

export const userProfile = createTRPCRouter({
  updateUserProfile: protectedProcedure
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
      
      let uploadedImageUrl = "";

      if (profileImg) {
        try {
          const uploadResponse = await cloudinary.v2.uploader.upload(profileImg, {
            folder: "users_profiles",
          });
          uploadedImageUrl = uploadResponse.secure_url;
        } catch (error) {
          console.error("Error uploading image to Cloudinary", error);
          return {
            message: "Error uploading image to Cloudinary",
            code: 500,
          };
        }
      }

      return ctx.prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          firstName,
          lastName,
          ...(uploadedImageUrl && { profileImg: uploadedImageUrl }),
        },
      });
    }),
});
