import nodemailer from "nodemailer";
interface MailProps {
  email: string;
  subject: string;
  template: any;
}

export async function sendEmail({ email, subject, template }: MailProps) { 
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOption = {
      from: "Waste Management System <no-reply@wastemanagementsystem.com>",
      to: email,
      subject: subject,
      html: template,
    };

    await transporter.sendMail(mailOption);
    return true;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
}
