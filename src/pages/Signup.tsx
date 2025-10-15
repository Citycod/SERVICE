/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer' as 'buyer' | 'seller',
    category: '',
    address: '',
    country: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromQuery = searchParams.get('role') || 'buyer';

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: roleFromQuery as 'buyer' | 'seller' }));
  }, [roleFromQuery]);

  const handleRoleChange = (newRole: 'buyer' | 'seller') => {
    if (newRole === formData.role) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, role: newRole }));
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.country) {
      setError('Country is required');
      return;
    }
    if (!formData.address) {
      setError('Address is required');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const requestData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        country: formData.country,
        role: formData.role,
        ...(formData.role === 'seller' && { category: formData.category })
      };

      console.log('Sending data:', requestData);

      const response = await fetch(`https://corsproxy.io/?${encodeURIComponent('https://service-api-7ssp.onrender.com/api/auth/register')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);

      // Handle both JSON and text responses
      let responseData;
      const responseText = await response.text();
      
      try {
        // Try to parse as JSON first
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        // If not JSON, use the text response
        responseData = { message: responseText };
      }

      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || `Registration failed with status: ${response.status}`);
      }

      // Success - check if response indicates success
      if (responseData.message && responseData.message.includes('successful')) {
        alert('🎉 Registration successful!');
        
        // Since backend returns text, we'll use form data for login
        login({
          id: Date.now().toString(), // Generate temporary ID
          name: formData.username,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          avatar: '',
        });

        if (formData.role === 'seller') {
          navigate('/seller-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        // If we get here but response is ok, assume success
        alert('🎉 Registration successful!');
        
        login({
          id: Date.now().toString(),
          name: formData.username,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          avatar: '',
        });

        if (formData.role === 'seller') {
          navigate('/seller-dashboard');
        } else {
          navigate('/dashboard');
        }
      }

    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong during registration';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    setTimeout(() => {
      login({
        id: '2',
        name: formData.username || 'Google User',
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        avatar: '',
      });

      if (formData.role === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container flex flex-col items-center justify-between px-4 py-12 mx-auto lg:flex-row">
        <div className="w-full mb-10 lg:w-1/2 lg:mb-0">
          <div className="relative">
            <div className="w-full h-64 shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-20 rounded-xl"></div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8">
          <div className="max-w-md p-6 mx-auto overflow-hidden transition-all duration-300 bg-white shadow-2xl rounded-2xl hover:shadow-2xl">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
              <p className="mt-2 text-gray-600">Join us to get started with your journey</p>
            </div>
            
            {error && (
              <div className="flex items-center p-3 mb-4 text-red-700 border border-red-200 rounded-lg bg-red-50">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleRoleChange('buyer')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                    formData.role === 'buyer'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('seller')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                    formData.role === 'seller'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Vendor
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="w-full p-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Choose a username"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full p-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full p-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+233572558822"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full p-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="w-full p-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">Address</label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="w-full p-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label htmlFor="country" className="block mb-1 text-sm font-medium text-gray-700">Country</label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                  className="w-full p-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Country</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  formData.role === 'seller' 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`space-y-4 pt-4 ${isTransitioning ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
                  <div>
                    <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">Business Category</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required={formData.role === 'seller'}
                      className="w-full p-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Catering">Catering</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Design">Design</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Painting">Painting</option>
                      <option value="Construction">Construction</option>
                      <option value="Gardening">Gardening</option>
                      <option value="Security">Security</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Carpentry">Carpentry</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Pest Control">Pest Control</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center w-full px-4 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing Up...
                  </>
                ) : 'Sign Up'}
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={submitting}
                className="flex items-center justify-center w-full px-4 py-3 font-semibold text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign Up with Google
              </button>
            </form>
            
            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 transition-colors duration-300 hover:text-blue-800">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;