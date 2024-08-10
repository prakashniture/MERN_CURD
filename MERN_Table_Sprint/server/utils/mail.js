import nodemailer from 'nodemailer';

export const sendResetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Reset Password',
    text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
  };

  await transporter.sendMail(mailOptions);
};
