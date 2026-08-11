import { createTransport } from "nodemailer";

const transporter = createTransport({
  host:'smtp.gmail.com',
  service: 'gmail',
  port: process.env.SMTP_PORT,
  secure:true,
  tls:{
    servername:'smtp.gmail.com',
    rejectUnauthorized: true,
  },
  auth: {
    user: process.env.EMAIL,
    pass: process.env.SMTP_EMAIL_PASS,
  },
});
export const sendMails = async (email,otp)=> {
  if (!transporter) return "SERVER ERROR: Email transporter not configured or transport not created";
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'OTP Verification',
      html: `
        <h1>Your OTP is: ${otp}</h1>
        <p>If you have not requested the otp please delete this email.</p>
      `,
    });
      return `Email sent to ${email}`;
  } catch (error) {
    return `SERVER ERROR: Failed to send email to ${email} : ${error.message}`;
  }
}