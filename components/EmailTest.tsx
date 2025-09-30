import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// Removed broken email imports
import { toast } from 'sonner';

const EmailTest = () => {
  const [testType, setTestType] = useState<'contact' | 'order'>('contact');
  const [loading, setLoading] = useState(false);
  
  // Contact form test data
  const [contactData, setContactData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    message: 'This is a test message from your portfolio contact form.'
  });

  // Order test data
  const orderData = {
    orderId: 'ORD-' + Date.now(),
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1987654321'
    },
    address: {
      street: '123 Main Street',
      city: 'New York',
      postal: '10001',
      country: 'United States'
    },
    items: [
      {
        id: 'web-dev',
        title: 'Web Development Service',
        price: 1500,
        quantity: 1
      },
      {
        id: 'design',
        title: 'UI/UX Design',
        price: 800,
        quantity: 1
      }
    ],
    subtotal: 2300,
    tax: 230,
    total: 2530
  };

  // Email test handlers
  const testContactEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (response.ok) {
        toast.success('Contact email sent successfully! Check malitmohamud@gmail.com');
      } else {
        toast.error('Failed to send contact email');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending contact email');
    } finally {
      setLoading(false);
    }
  };

  const testOrderEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (response.ok) {
        toast.success('Order email sent successfully! Check malitmohamud@gmail.com');
      } else {
        toast.error('Failed to send order email');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending order email');
    } finally {
      setLoading(false);
    }
  };

  const checkEmailServerConfig = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/send-contact', {
        method: 'OPTIONS'
      });
      if (response.status === 200 || response.status === 404) {
        return '✅ Email Server Running';
      } else {
        return '❌ Email Server Not Responding';
      }
    } catch (error) {
      return '❌ Email Server Not Running (Start with: node email-server.js)';
    }
  };

  const [serverStatus, setServerStatus] = useState('❓ Checking...');

  // Check server status on load
  useEffect(() => {
    checkEmailServerConfig().then(setServerStatus);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Email Service Test Panel</h1>
        
        {/* Configuration Status */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle>Email Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Server Status:</span>
                <span className="font-mono text-sm">{serverStatus}</span>
              </div>
              <Button 
                onClick={() => checkEmailServerConfig().then(setServerStatus)} 
                size="sm" 
                variant="outline"
              >
                Refresh Status
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Email Test Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Test Type</label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setTestType('contact')}
                    variant={testType === 'contact' ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    Contact Form
                  </Button>
                  <Button
                    onClick={() => setTestType('order')}
                    variant={testType === 'order' ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    Order Email
                  </Button>
                </div>
              </div>

              {testType === 'contact' && (
                <div className="space-y-3">
                  <Input
                    placeholder="Name"
                    value={contactData.name}
                    onChange={(e) => setContactData({...contactData, name: e.target.value})}
                  />
                  <Input
                    placeholder="Email"
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                  />
                  <Input
                    placeholder="Phone"
                    value={contactData.phone}
                    onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                  />
                  <Textarea
                    placeholder="Message"
                    value={contactData.message}
                    onChange={(e) => setContactData({...contactData, message: e.target.value})}
                  />
                </div>
              )}

              <Button
                onClick={testType === 'contact' ? testContactEmail : testOrderEmail}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Sending...' : `Send Test ${testType === 'contact' ? 'Contact' : 'Order'} Email`}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Data */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>
                {testType === 'contact' ? 'Contact' : 'Order'} Data Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-gray-900 p-4 rounded overflow-auto">
                {JSON.stringify(testType === 'contact' ? contactData : orderData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-gray-800 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Make sure your Gmail App Password is configured in <code>email-server.js</code></li>
              <li>Start the email server: <code>node email-server.js</code></li>
              <li>The server should run on <code>http://localhost:3001</code></li>
              <li>Use this page to test email functionality</li>
              <li>Check <code>malitmohamud@gmail.com</code> for received emails</li>
              <li>All emails will be sent from and to <code>malitmohamud@gmail.com</code></li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button onClick={() => window.location.href = '/'} variant="outline">
            Back to Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailTest;