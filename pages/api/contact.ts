import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  const emailHtml = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    <p><strong>Message:</strong> ${message}</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
  `;

  try {
    await sendEmail(
      'malitmohamud@gmail.com',
      `New Contact Form Submission - ${name}`,
      emailHtml
    );
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}