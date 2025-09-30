import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, User, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onLogin: (isAuthenticated: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Get admin credentials from environment variables
  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'password123';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true');
      onLogin(true);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  const handleDemoLogin = () => {
    setCredentials({
      email: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setError('');

    // Simulate sending reset email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Send email to malitmohamud@gmail.com with reset instructions
    console.log('Password reset requested for:', resetEmail);
    console.log('Reset email sent to: malitmohamud@gmail.com');
    
    setResetSuccess(true);
    setResetLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </motion.button>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-xl">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <User className="w-10 h-10 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
              <CardDescription className="text-gray-400">
                Access the Portfolio Management Dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="admin@malit.dev"
                      className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••••••"
                      className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                
                {/* Forgot Password Link */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-gray-400 hover:text-white transition-colors underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>

              {/* Demo Section */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-center text-gray-400 text-sm mb-4">DEMO</p>
                <Button
                  onClick={handleDemoLogin}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Use Demo Credentials
                </Button>
                <div className="text-center text-xs text-gray-500 mt-3">
                  <p>Demo credentials:</p>
                  <p>Email: admin@malit.dev</p>
                  <p>Password: Contact admin for password</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700"
          >
            {!resetSuccess ? (
              <>
                <h3 className="text-xl font-bold text-white mb-4">Reset Password</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Enter your email address and we'll send password reset instructions to malitmohamud@gmail.com
                </p>
                
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                  
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={resetLoading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {resetLoading ? 'Sending...' : 'Send Reset Email'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForgotPassword(false)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Email Sent!</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Password reset instructions have been sent to malitmohamud@gmail.com
                  </p>
                  <Button
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetSuccess(false);
                      setResetEmail('');
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Back to Login
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;