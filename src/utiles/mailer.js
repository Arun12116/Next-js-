import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcrypt from "bcryptjs"; // Corrected import for bcrypt

export const sendEmail = async ({ email, emailType, userID }) => {
  try {
    // Hash the user ID to create a token
    const hashedToken = await bcrypt.hash(userID.toString(), 10);

    // Update user record based on email type
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 36000000, // 10 hours
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 36000000, // 10 hours
      });
    }

    // Configure the email transport
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6dbc9358c9505b",
        pass: "5668f3753b138a"
      }
    });

    // Set up email options
    const mailOptions = {
      from: "arun@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: emailType === "VERIFY" ? "Please verify your email." : "Please reset your password.",
      html: `
        <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
        <p>Or, copy and paste the link below in your browser:</p>
        <br>
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      `,
    };
    

    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
