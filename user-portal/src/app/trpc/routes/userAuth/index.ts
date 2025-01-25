import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { generateJwtToken } from "@/lib/services/jwt";
import { sendEmail } from "@/lib/services/sendEmail";
import { TRPCError } from "@trpc/server";
import {
  passwordResetTempEmail,
  forgotPasswordEmail,
  verificationEmailTemp,
  welcomeEmailTemp,
} from "../../../../lib/services/emailTemp";
import { hashPassword } from "@/lib/services/bcrypt";

export const userAuth = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string(),
        phoneNo: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.users.findFirst({
        where: { email: input.email },
      });
      if (user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email is already in use",
        });
      }
      const tokenPayload = { email: input.email };
      const token = await generateJwtToken(tokenPayload);
      const hashPass = await hashPassword(input.password);

      const newUser = await ctx.prisma.users.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          password: hashPass,
          emailToken: token,
          phone: input.phoneNo,
        },
      });

      const isEmailSent = await sendEmail({
        email: newUser.email,
        subject:
          "Verify Your Email to Complete Your Registration at Waste Management System",
        template: verificationEmailTemp(
          newUser.firstName,
          newUser.lastName,
          token
        ),
      });

      return {
        isEmailSent,
      };
    }),
  sendAgainEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.users.findFirst({
        where: { email: input.email },
        select: {
          firstName: true,
          lastName: true,
          emailToken: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email not found",
        });
      }
      await sendEmail({
        email: input.email,
        subject:
          "Verify Your Email to Complete Your Registration at Waste Management System",
        template: verificationEmailTemp(
          user.firstName,
          user.lastName,
          user.emailToken!
        ),
      });
    }),
  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.users.findFirst({
        where: {
          emailToken: input.token,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Verification link is expired or invalid.`,
        });
      }
      const cUser = await ctx.prisma.users.update({
        where: { id: user.id },
        data: { isVerified: true, emailToken: null },
      });

      await sendEmail({
        email: cUser.email,
        subject:
          "Welcome to Waste Management System! Get started with your account",
        template: welcomeEmailTemp(cUser.firstName, cUser.lastName),
      });
    }),
  forgotPassword: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.users.findFirst({
        where: { email: input.email },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email not found",
        });
      }
      const tokenPayload = { userId: user.id };
      const token = await generateJwtToken(tokenPayload);
      const resetPassUser = await ctx.prisma.users.update({
        where: { id: user.id },
        data: {
          emailToken: token,
        },
      });
      await sendEmail({
        email: resetPassUser.email,
        subject: "Reset Your Waste Management System Account Password",
        template: forgotPasswordEmail(
          resetPassUser.firstName,
          resetPassUser.lastName,
          token
        ),
      });
      return {
        message: "Reset email send successfully!",
      };
    }),
  CheckToken: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.users.findFirst({
        where: { emailToken: input.token },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "The password reset link you used has expired. For security reasons, reset links are only valid for a limited time. Please request a new link.",
        });
      }
    }),
  ResetPassword: publicProcedure
    .input(
      z.object({
        newPassword: z.string(),
        token: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.users.findFirst({
        where: { emailToken: input.token },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "You cannot reset your password manually. Please use the reset link sent to your registered email.",
        });
      }
      await ctx.prisma.users.update({
        where: { id: user.id },
        data: {
          password: await hashPassword(input.newPassword),
          emailToken: null,
        },
      });
      await sendEmail({
        email: user.email,
        subject: "Your Password Has Been Reset Successfully!",
        template: passwordResetTempEmail(user.firstName, user.lastName),
      });
      return { message: "Your password has been successfully reset." };
    }),
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in." });
    }

    //@ts-ignore
    const email = ctx.user.email;
    const currentUser = await ctx.prisma.users.findFirst({
      where: { email: email },
      include: {
        leaderboard: {
          select: {
            score: true,
            rank: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        report: true,
        reward: {
          select: {
            points: true,
          },
        },
        transaction: true,
      },
    });
    if (!currentUser) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
    }
    return currentUser;
  }),
});
