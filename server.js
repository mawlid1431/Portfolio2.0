import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = 3001;

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

// Configure Gmail SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'malitmohamud@gmail.com',
      pass: 'rzwhdmfqwakdpgsr', // Gmail app password (spaces removed)
    },
    secure: true,
  });
};

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  const { type, data } = req.body;

  try {
    const transporter = createTransporter();
    let mailOptions;

    if (type === 'contact') {
      mailOptions = {
        from: 'malitmohamud@gmail.com',
        to: 'malitmohamud@gmail.com',
        subject: `📩 New Contact Form Submission from ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">New Contact Form Submission</h1>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <p style="font-size: 16px; margin-bottom: 20px;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Contact Information:</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              </div>
              
              <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Message:</h3>
                <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 8px;">
                <p style="margin: 0; color: #666;">This message was sent from your portfolio contact form</p>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Portfolio: mowlid.dev</p>
              </div>
            </div>
          </div>
        `,
      };
    } else if (type === 'order') {
      mailOptions = {
        from: 'malitmohamud@gmail.com',
        to: 'malitmohamud@gmail.com',
        subject: `🛒 New Order Received! - Order ${data.orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">🎉 New Order Received!</h1>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #4CAF50; margin: 0;">Order ${data.orderId}</h2>
                <p style="margin: 5px 0 0 0; color: #666;">Placed on ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Customer Information:</h3>
                <p><strong>Name:</strong> ${data.customer.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.customer.email}">${data.customer.email}</a></p>
                <p><strong>Phone:</strong> ${data.customer.phone}</p>
              </div>
              
              <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Shipping Address:</h3>
                <p style="margin: 0;">
                  ${data.address.street}<br>
                  ${data.address.city}, ${data.address.postal}<br>
                  ${data.address.country}
                </p>
              </div>
              
              <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Order Items:</h3>
                ${data.items.map(item => `
                  <div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                    <div style="display: flex; justify-content: space-between;">
                      <div>
                        <strong>${item.title}</strong><br>
                        <span style="color: #666;">Quantity: ${item.quantity}</span>
                      </div>
                      <div>
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
              
              <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Order Summary:</h3>
                <div style="margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between;">
                    <span>Subtotal (${data.items.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                    <span>$${data.subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <div style="margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between;">
                    <span>Tax:</span>
                    <span>$${data.tax.toFixed(2)}</span>
                  </div>
                </div>
                <div style="margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between; color: green;">
                    <span>Shipping:</span>
                    <span><strong>FREE 🎉</strong></span>
                  </div>
                </div>
                <hr style="border: none; border-top: 2px solid #4CAF50; margin: 15px 0;">
                <div style="font-size: 18px; font-weight: bold;">
                  <div style="display: flex; justify-content: space-between;">
                    <span>Total:</span>
                    <span style="color: #4CAF50;">$${data.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 8px;">
                <p style="margin: 0; color: #666;">This order was placed through your portfolio services</p>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Portfolio: mowlid.dev</p>
              </div>
            </div>
          </div>
        `,
      };
    } else {
      return res.status(400).json({ success: false, message: 'Invalid email type' });
    }

    await transporter.sendMail(mailOptions);
    console.log(`✅ ${type} email sent successfully`);
    
    return res.status(200).json({ 
      success: true, 
      message: `${type} email sent successfully` 
    });

  } catch (error) {
    console.error(`❌ Error sending ${type} email:`, error);
    return res.status(500).json({ 
      success: false, 
      message: `Error sending ${type} email: ${error.message}` 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Email server is running' });
});

app.listen(port, () => {
  console.log(`🚀 Email server running on http://localhost:${port}`);
});