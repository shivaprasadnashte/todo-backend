import nodemailer from "nodemailer";

export async function sendMail(email:string, otp:number) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.PUBLIC_MAIL_ID,
      pass: process.env.PUBLIC_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.PUBLIC_MAIL_ID,
    to: email,
    subject: "Hello from w3dev",
    text:
      "Your OTP is: " +
      otp +
      " Please verify your email and don't share this OTP with anyone",
  };

  await transporter.sendMail(mailOptions);
  return true;
}
