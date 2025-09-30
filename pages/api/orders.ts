import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { orderId, customer, address, items, subtotal, tax, total } = req.body;

  const itemsList = items.map((item: any) => 
    `<li>${item.title} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
  ).join('');

  const emailHtml = `
    <h2>New Order Received - ${orderId}</h2>
    <h3>Customer Information:</h3>
    <p><strong>Name:</strong> ${customer.name}</p>
    <p><strong>Email:</strong> ${customer.email}</p>
    <p><strong>Phone:</strong> ${customer.phone}</p>
    ${address.street ? `<p><strong>Address:</strong> ${address.street}, ${address.city}, ${address.postal}, ${address.country}</p>` : ''}
    
    <h3>Order Details:</h3>
    <ul>${itemsList}</ul>
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
    <p><strong>Total: $${total.toFixed(2)}</strong></p>
    <p><strong>Order Time:</strong> ${new Date().toLocaleString()}</p>
  `;

  try {
    await sendEmail(
      'malitmohamud@gmail.com',
      `New Order #${orderId} - $${total.toFixed(2)}`,
      emailHtml
    );
    res.status(200).json({ message: 'Order submitted successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to submit order' });
  }
}