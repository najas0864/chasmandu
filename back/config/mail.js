import { createTransport } from "nodemailer";

export const sendMails = async (email,otp)=> {
  try {
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
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'OTP Verification',
      html: `
        <h1>Your OTP is: ${otp}</h1>
        <p>If you have not requested the otp please delete this email.</p>
      `,
    });
    console.log(`Email sent to :${email} `);
  } catch (error) {
      console.log(`error semding email to ${email}`);
  }
}