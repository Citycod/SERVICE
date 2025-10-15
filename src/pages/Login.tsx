/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, AlertCircle, User, Building2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'buyer' as 'buyer' | 'seller',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!formData.username || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      const loginData = {
        username: formData.username,
        password: formData.password,
      };

      console.log('🚀 Sending login request with data:', loginData);

      const response = await fetch(
        `https://service-api-7ssp.onrender.com/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();
      console.log('✅ API response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check credentials.');
      }

      if (!data.user) {
        throw new Error('Invalid response from server: user data missing.');
      }

      // Store user using context
      const user = {
        id: data.user._id || data.user.id,
        name: data.user.username || data.user.name,
        email: data.user.email || '',
        phone: data.user.phone || '',
        role: data.user.role || formData.userType,
        avatar: data.user.avatar || '',
      };

      login(user);

      // Redirect user based on role
      const redirectPath =
        user.role === 'seller' ? '/seller-dashboard' : '/dashboard';

      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      console.error('💥 Login error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleUserTypeChange = (userType: 'buyer' | 'seller') => {
    setFormData((prev) => ({ ...prev, userType }));
    if (error) setError('');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link
                to="/signup"
                className="font-medium text-blue-600 transition-colors hover:text-blue-500"
              >
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block mb-3 text-sm font-medium text-gray-700">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleUserTypeChange('buyer')}
                  className={`flex items-center justify-center px-4 py-3 border rounded-md transition-colors ${
                    formData.userType === 'buyer'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5 mr-2" />
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => handleUserTypeChange('seller')}
                  className={`flex items-center justify-center px-4 py-3 border rounded-md transition-colors ${
                    formData.userType === 'seller'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  Vendor
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start p-4 mb-4 rounded-md bg-red-50">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="block w-full py-3 pl-10 pr-3 placeholder-gray-400 transition-colors border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full py-3 pl-10 pr-10 placeholder-gray-400 transition-colors border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                >
                  {submitting ? 'Signing in...' : `Sign in as ${formData.userType}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative flex-1 hidden w-0 lg:block">
        <div className="absolute inset-0 w-full h-full">
          <img
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?auto=format&fit=crop&w=1908&q=80"
            alt="Authentication background"
          />
          <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-70"></div>
        </div>
        <div className="absolute text-white bottom-10 left-10">
          <h2 className="mb-2 text-2xl font-bold">
            {formData.userType === 'seller'
              ? 'Grow Your Business With Us'
              : 'Find Trusted Professionals'}
          </h2>
          <p className="max-w-md">
            {formData.userType === 'seller'
              ? 'Access your seller dashboard to manage projects, connect with clients, and grow your business.'
              : 'Access your account to find professionals, manage projects, and get your tasks done.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
