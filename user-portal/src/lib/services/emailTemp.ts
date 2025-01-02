export const welcomeEmailTemp = (firstName: string, lastName: string) => {
  const welcomeEmailTemp = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Waste Management System</title>
      <style>
          body {
              margin: 0;
              padding: 2rem;
              font-family: 'Arial', sans-serif;
              background-color: #f1f8f5; /* Light green background */
              font-size: 16px;
              color: #333333;
          }
          .email-container {
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              margin: 2rem auto;
              padding: 2rem;
              text-align: center;
              border: 2px solid #4caf50; /* Green border */
          }
          .email-logo {
              width: 120px;
              margin-bottom: 1.5rem;
          }
          .email-title {
              font-size: 24px;
              font-weight: bold;
              color: #2e7d32; /* Dark green */
              margin-bottom: 1rem;
          }
          .email-content {
              font-size: 16px;
              line-height: 1.6;
              text-align: justify;
          }
          .cta-button {
              display: inline-block;
              background-color: #4caf50; /* Green button */
              color: white;
              text-decoration: none;
              padding: 0.75rem 1.5rem;
              font-size: 16px;
              font-weight: bold;
              border-radius: 4px;
              margin: 1.5rem 0;
          }
        a{
        color: white
        }
          .cta-button:hover {
              background-color: #388e3c;
          }
          .footer {
              margin-top: 2rem;
              font-size: 14px;
              color: #666666;
              text-align: center;
          }
          .social-links a {
              color: #4caf50;
              text-decoration: none;
              margin: 0 0.5rem;
          }
      </style>
      </head>
      <body>
      <div class="email-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5E5mYLf3XmvexGS_zMB1DD-_SUKXQRvTOA&s" alt="WMS Logo" class="email-logo">
          <h1 class="email-title">Welcome to Waste Management System</h1>
          <p class="email-content">
              Dear <strong>${firstName + " " + lastName}</strong>,<br><br>
              Congratulations! Your email address has been successfully verified, and you are now part of the Waste Management System community. We are thrilled to have you on board as we work together towards a cleaner and greener future.
          </p>
          <p class="email-content">
              As a verified member, you now have full access to all features of the Waste Management System, including real-time waste tracking, collection scheduling, and performance analytics to help you achieve your waste management goals.
          </p>
          <a href="${
            process.env.NEXT_PUBLIC_CUSTOMER_URL
          }/auth/login" class="cta-button">Login to Your Account</a>
          <p class="email-content">
              Don't forget to follow us on social media for the latest updates, tips, and success stories:
          </p>
          <p class="social-links">
              <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Twitter</a> | <a href="#">LinkedIn</a>
          </p>
          <p class="email-content">
              If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:support@wastemanagementsystem.com">support@wastemanagementsystem.com</a>.
          </p>
          <p class="email-content">
              Thank you for choosing the Waste Management System. We look forward to working with you for a sustainable tomorrow!
          </p>
          <hr>
          <div class="footer">
              &copy; 2024 Waste Management System. All rights reserved.
          </div>
      </div>
      </body>
      </html>
    `;
  return welcomeEmailTemp;
};

export const verificationEmailTemp = (
  firstName: string,
  lastName: string,
  verificationToken: string
) => {
  const verificationEmailTemp = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            margin: 0;
            padding: 2rem;
            font-family: 'Arial', sans-serif;
            background-color: #f1f8f5; /* Light green background */
            font-size: 16px;
            color: #333333;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            text-align: center;
            border: 2px solid #4caf50; /* Green border */
        }
        .email-logo {
            width: 120px;
            margin-bottom: 1.5rem;
        }
        .email-title {
            font-size: 24px;
            font-weight: bold;
            color: #2e7d32; /* Dark green */
            margin-bottom: 1rem;
        }
        .email-content {
            font-size: 16px;
            line-height: 1.6;
            text-align: justify;
        }
        .cta-button {
            display: inline-block;
            background-color: #4caf50; /* Green button */
            color: white;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            font-size: 16px;
            font-weight: bold;
            border-radius: 4px;
            margin: 1.5rem 0;
        }
        a{
        color: white
        }
        .cta-button:hover {
            background-color: #388e3c;
        }
        .footer {
            margin-top: 2rem;
            font-size: 14px;
            color: #666666;
            text-align: center;
        }
    </style>
    </head>
    <body>
    <div class="email-container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5E5mYLf3XmvexGS_zMB1DD-_SUKXQRvTOA&s" alt="WMS Logo" class="email-logo">
        <h1 class="email-title">Verify Your Email Address</h1>
        <p class="email-content">
            Dear <strong>${firstName + " " + lastName}</strong>,<br><br>
            Thank you for signing up for the Waste Management System! Before we get started, we need to verify your email address to ensure secure access to your account.
        </p>
        <a href="${
          process.env.NEXT_PUBLIC_CUSTOMER_URL
        }/auth/email-verification/${verificationToken}" class="cta-button">Verify Email Address</a>
        <p class="email-content">
            If you didn’t sign up for this account, you can safely ignore this email. If you need any assistance, feel free to contact us at <a href="mailto:support@wastemanagementsystem.com">support@wastemanagementsystem.com</a>.
        </p>
        <hr>
        <div class="footer">
            &copy; 2024 Waste Management System. All rights reserved.
        </div>
    </div>
    </body>
    </html>
    `;
  return verificationEmailTemp;
};

export const forgotPasswordEmail = (
  firstName: string,
  lastName: string,
  emailResetToken: string
) => {
  const forgotPasswordEmail = `
      <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
      body {
          margin: 0;
          padding: 2rem;
          font-family: 'Arial', sans-serif;
          background-color: #f1f8f5; /* Light green background */
          font-size: 16px;
          color: #333333;
      }
      .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          text-align: center;
          border: 2px solid #4caf50; /* Green border */
      }
      .email-logo {
          width: 120px;
          margin-bottom: 1.5rem;
      }
      .email-title {
          font-size: 24px;
          font-weight: bold;
          color: #2e7d32; /* Dark green */
          margin-bottom: 1rem;
      }
      .email-content {
          font-size: 16px;
          line-height: 1.6;
          text-align: justify;
      }
      .cta-button {
          display: inline-block;
          background-color: #4caf50; /* Green button */
          color: #ffffff;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          font-size: 16px;
          font-weight: bold;
          border-radius: 4px;
          margin: 1.5rem 0;
      }
      .cta-button:hover {
          background-color: #388e3c;
      }
      .footer {
          margin-top: 2rem;
          font-size: 14px;
          color: #666666;
          text-align: center;
      }
  </style>
  </head>
  <body>
  <div class="email-container">
      <img src="https://media.istockphoto.com/id/1384532150/vector/recycle-symbol-inside-circle-with-leaves-zero-waste-concept.jpg?s=612x612&w=0&k=20&c=lQPT8cj_dpkQBxa1G4Y6RzDz5vLog6OmWERx-vGpF_Y=" alt="WMS Logo" class="email-logo">
      <h1 class="email-title">Reset Your Password</h1>
      <p class="email-content">
          Dear <strong>${firstName + " " + lastName}</strong>,<br><br>
          We received a request to reset your password for your Waste Management System account. If this was you, please click the button below to reset your password:
      </p>
      <a href="${
        process.env.NEXT_PUBLIC_CUSTOMER_URL
      }/auth/reset-password/${emailResetToken}" class="cta-button">Reset Password</a>
      <p class="email-content">
          If you didn’t request a password reset, you can safely ignore this email. Your password will remain unchanged.
      </p>
      <p class="email-content">
          For further assistance, feel free to contact us at <a href="mailto:support@wastemanagementsystem.com">support@wastemanagementsystem.com</a>.
      </p>
      <hr>
      <div class="footer">
          &copy; 2024 Waste Management System. All rights reserved.
      </div>
  </div>
  </body>
  </html>`;
  return forgotPasswordEmail;
};

export const passwordResetTempEmail = (firstName: string, lastName: string) => {
  const passwordResetTempEmail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Confirmation</title>
    <style>
        body {
            margin: 0;
            padding: 2rem;
            font-family: 'Arial', sans-serif;
            background-color: #f1f8f5; /* Light green background */
            font-size: 16px;
            color: #333333;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            text-align: center;
            border: 2px solid #4caf50; /* Green border */
        }
        .email-logo {
            width: 120px;
            margin-bottom: 1.5rem;
        }
        .email-title {
            font-size: 24px;
            font-weight: bold;
            color: #2e7d32; /* Dark green */
            margin-bottom: 1rem;
        }
        .email-content {
            font-size: 16px;
            line-height: 1.6;
            text-align: justify;
        }
        .footer {
            margin-top: 2rem;
            font-size: 14px;
            color: #666666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://media.istockphoto.com/id/1384532150/vector/recycle-symbol-inside-circle-with-leaves-zero-waste-concept.jpg?s=612x612&w=0&k=20&c=lQPT8cj_dpkQBxa1G4Y6RzDz5vLog6OmWERx-vGpF_Y=" alt="WMS Logo" class="email-logo">
        <h1 class="email-title">Password Reset Successful</h1>
        <p class="email-content">
            Dear <strong>${firstName + " " + lastName}</strong>,<br><br>
            Your password has been successfully reset. You can now use your new password to log in to the Waste Management System.
        </p>
        <p class="email-content">
            If you did not request a password reset, please contact us immediately at <a href="mailto:support@wastemanagementsystem.com">support@wastemanagementsystem.com</a> to secure your account.
        </p>
        <p class="email-content">
            Thank you for being a part of the Waste Management System community. We are here to support you!
        </p>
        <hr>
        <div class="footer">
            &copy; 2024 Waste Management System. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
  return passwordResetTempEmail;
};
