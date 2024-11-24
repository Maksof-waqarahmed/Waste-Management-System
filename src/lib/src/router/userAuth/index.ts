// import { string, z } from "zod";
// import { createTRPCRouter, publicProcedure } from "../../trpc";
// import { hashPassword, verifyPassword } from "../../bcrypt";
// import { generateJwtToken } from "@/lib/utils/jwt";
// import { sendEmail } from "@/lib/utils/sendEmail";
// import { TRPCError } from "@trpc/server";
// import { passwordResetTempEmail, resetPasswordEmail, verificationEmailTemp, welcomeEmailTemp } from "../../services/emailTemp";

// export const userAuth = createTRPCRouter({
//   create: publicProcedure
//     .input(
//       z.object({
//         firstName: z.string(),
//         lastName: z.string(),
//         email: z.string().email(),
//         password: z.string(),
//         phoneNo: z.string(),
//       })
//     )
//     .mutation(async ({ ctx, input }) => {
//       const user = await ctx.prisma.users.findFirst({
//         where: { email: input.email },
//       });
//       if (user) {
//         throw new TRPCError({
//           code: "BAD_REQUEST",
//           message: "Email is already in use",
//         });
//       }
//       const tokenPayload = { email: input.email };
//       input.password = await hashPassword(input.password)
//       const token = await generateJwtToken(tokenPayload);

//       const newUser = await ctx.prisma.users.create({
//         data: {
//         ...input,
//         emailToken: token,
//         },
//       });

//       const isEmailSent = await sendEmail({
//         email: newUser.email,
//         subject:
//           "Verify Your Email to Complete Your Registration at Waste Management System",
//         template: verificationEmailTemp(newUser.firstName, newUser.lastName, token),
//       });

//       return {
//         isEmailSent,
//       };
//     }),
//     verifyEmail: publicProcedure.input(
//       z.object({
//         token: z.string();
//       })
//     ).mutation(async ({ctx, input}) => {
//       const user = await ctx.prisma.users.findFirst({
//         where: {
//           token: input.token,
//         },
//       })
//       if(!user){
//         throw new TRPCError({
//           code: "BAD_REQUEST",
//           message: `Verification link is expired or invalid.`
//         })
//       }
//       const cUser = await ctx.prisma.users.update({
//         where: {id: user.id},
//         data: { isVerified: true, emailToken: null}
//       })

//       await sendEmail({email: cUser.email, subject: "Welcome to Waste Management System! Get started with your account", template: welcomeEmailTemp(cUser.firstName , cUser.lastName)})

//     }),
//     forgetPassword: publicProcedure.input(
//       z.object({
//         email: string(),
//       })
//     ).mutation(async ({ctx, input}) => {
//       const user = await ctx.prisma.users.findFirst({
//         where: {email: input.email}
//       })
//       if(!user){
//         throw new TRPCError({
//           code: "BAD_REQUEST",
//           message: "Email not found"
//         })
//       }
//       const tokenPayload = { userId: user.id };
//       const token = await generateJwtToken(tokenPayload);
//       const resetPassUser = await ctx.prisma.users.update({
//         where: {id: user.id},
//         data: {
//           emailToken: token
//         }
//       })
//       const isSent = await sendEmail({email: resetPassUser.email, subject: "Reset Your Waste Management System Account Password", template: resetPasswordEmail(resetPassUser.findFirst, resetPassUser.lastName, token)});
//       return {
//         message: "Reset email send successfully!"
//       }
//     }),
//     CheckToken: publicProcedure.input(
//       z.object({
//         token: string(),
//       })
//     ).mutation(async ({ctx, input}) => {
//       const user = await ctx.prisma.users.findFirst({
//         where: {token: input.token}
//       })
//       if(!user){
//         throw new TRPCError({code: "UNAUTHORIZED", message: "The password reset link you used has expired. For security reasons, reset links are only valid for a limited time. Please request a new link."})
//       }
//     }),
//     ResetPassword: publicProcedure.input(
//       z.object({
//         newPassword: z.string(),
//         token: z.string()
//       })
//     ).mutation(async ({ctx, input}) => {
//       const user = await ctx.prisma.users.findFirst({
//         where: {token: input.token},
//       })
//       if(!user){
//         throw new TRPCError({code: "UNAUTHORIZED", message: "You cannot reset your password manually. Please use the reset link sent to your registered email."})
//       }
//       await ctx.prisma.users.update({
//         where: {id: user.id},
//         data: {
//           password: input.newPassword,
//           emailToken: null
//         }
//       });
//       await sendEmail({email: user.email, subject: "Your Password Has Been Reset Successfully!", template:passwordResetTempEmail(user.firstName, user.lastName) })
//       return { message: 'Your password has been successfully reset.' };
//     }),
// });
