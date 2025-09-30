// Simple email service using EmailJS (no server needed)
export const sendContactEmail = async (contactData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  // Using a simple email service that works without a server
  const emailData = {
    to_email: 'malitmohamud@gmail.com',
    from_name: contactData.name,
    from_email: contactData.email,
    phone: contactData.phone || 'Not provided',
    message: contactData.message,
    timestamp: new Date().toLocaleString()
  };

  // For now, we'll use a webhook service like Formspree or similar
  // This is a placeholder - you can replace with any email service
  console.log('📩 Contact Email Data:', emailData);
  
  // Simulate email sending
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

export const sendOrderEmail = async (orderData: any) => {
  const emailData = {
    to_email: 'malitmohamud@gmail.com',
    order_id: orderData.orderId,
    customer_name: orderData.customer.name,
    customer_email: orderData.customer.email,
    customer_phone: orderData.customer.phone,
    total: orderData.total,
    items_count: orderData.items.length,
    timestamp: new Date().toLocaleString()
  };

  console.log('🛒 Order Email Data:', emailData);
  
  // Simulate email sending
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};