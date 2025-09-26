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
      console.log('✅ Contact email sent successfully');
      return true;
    } else {
      console.error('❌ Error sending contact email:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    return false;
  }
};

export const sendOrderEmail = async (data: OrderData): Promise<boolean> => {
  try {
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
      console.log('✅ Order email sent successfully');
      return true;
    } else {
      console.error('❌ Error sending order email:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending order email:', error);
    return false;
  }
};