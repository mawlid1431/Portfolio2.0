// Email service utility for sending contact form and order emails
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface OrderData {
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    postal: string;
    country: string;
  };
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
}

export const sendContactEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    console.log('📧 Sending contact email to malitmohamud@gmail.com...');
    
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        data: data
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log('✅ Contact email sent successfully to malitmohamud@gmail.com');
      return true;
    } else {
      console.error('❌ Error sending contact email:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    // Fallback to mailto
    sendEmailFallback('contact', data);
    return false;
  }
};

export const sendOrderEmail = async (data: OrderData): Promise<boolean> => {
  try {
    console.log('📧 Sending order email to malitmohamud@gmail.com...');
    console.log('Order details:', data);
    
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'order',
        data: data
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log('✅ Order email sent successfully to malitmohamud@gmail.com');
      return true;
    } else {
      console.error('❌ Error sending order email:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending order email:', error);
    // Fallback to mailto
    sendEmailFallback('order', data);
    return false;
  }
};

// Fallback email service using mailto (opens user's email client)
export const sendEmailFallback = (type: 'contact' | 'order', data: any) => {
  const toEmail = 'malitmohamud@gmail.com';
  let subject = '';
  let body = '';

  if (type === 'contact') {
    subject = `Portfolio Contact: ${data.name}`;
    body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nDate: ${new Date().toLocaleString()}\n\nMessage:\n${data.message}`;
  } else if (type === 'order') {
    subject = `New Order #${data.orderId} - $${data.total.toFixed(2)}`;
    const items = data.items.map((item: any) => `- ${item.title} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    body = `🎉 NEW ORDER RECEIVED!\n\nOrder ID: ${data.orderId}\nDate: ${new Date().toLocaleString()}\nTotal: $${data.total.toFixed(2)}\n\nCUSTOMER INFO:\nName: ${data.customer.name}\nEmail: ${data.customer.email}\nPhone: ${data.customer.phone}\n\nSHIPPING ADDRESS:\n${data.address.street}\n${data.address.city}, ${data.address.postal}\n${data.address.country}\n\nORDERED ITEMS:\n${items}\n\nPAYMENT SUMMARY:\nSubtotal: $${data.subtotal.toFixed(2)}\nTax: $${data.tax.toFixed(2)}\nTotal: $${data.total.toFixed(2)}`;
  }

  const mailtoUrl = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl, '_blank');
  console.log('📧 Fallback email opened in default mail client');
};