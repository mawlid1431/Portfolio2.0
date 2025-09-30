import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'malitmohamud@gmail.com',
    pass: process.env.SMTP_PASS || 'zooy hxur dssz brrc',
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER || 'malitmohamud@gmail.com',
    to,
    subject,
    html,
  });
};