/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, Lock, AlertCircle, User, Building2 } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({ 
    username: '',
    password: '',
    userType: 'buyer' as 'buyer' | 'seller'
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      // Validate inputs
      if (!formData.username || !formData.password) {
        throw new Error('Please fill in all fields')
      }

      // Prepare login data for backend
      const loginData = {
        username: formData.username,
        password: formData.password
      }

      console.log('🚀 Sending login request with data:', loginData);

      // Solution: Use a CORS proxy or fix the request
      const apiUrl = 'https://service-api-7ssp.onrender.com/api/auth/login';
      
      // Try different approaches:
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Origin header to match what backend expects
          'Origin': 'https://service-two-sand.vercel.app'
        },
        mode: 'cors', // Explicitly set cors mode
        credentials: 'include', // Include credentials if needed
        body: JSON.stringify(loginData),
      })

      console.log('✅ Response received! Status:', response.status);

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `Login failed with status: ${response.status}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (parseError) {
          // If response is not JSON, try to get text
          try {
            const errorText = await response.text();
            if (errorText) errorMessage = errorText;
          } catch (textError) {
            // Ignore text parsing errors
          }
        }

        // Handle specific errors
        if (errorMessage.includes('Invalid credentials')) {
          throw new Error('Invalid username or password. Please try again.');
        } else if (errorMessage.includes('User not found')) {
          throw new Error('No account found with this username. Please sign up first.');
        } else {
          throw new Error(errorMessage);
        }
      }

      // Parse successful response
      const responseData = await response.json();
      console.log('🎉 Login successful! Response data:', responseData);

      // Login successful - ONLY use real backend data
      if (responseData.user) {
        console.log('👤 User data found in response:', responseData.user);
        
        // Transform backend user data to match your frontend format
        const userToLogin = {
          id: responseData.user._id || responseData.user.id,
          name: responseData.user.username || responseData.user.name,
          email: responseData.user.email || '',
          phone: responseData.user.phone || '',
          role: responseData.user.role || formData.userType,
          avatar: responseData.user.avatar || '',
          // Include any additional fields your app needs
          ...(responseData.user.role === 'seller' && {
            companyName: responseData.user.companyName || '',
            businessType: responseData.user.businessType || '',
            verified: responseData.user.verified || false,
            rating: responseData.user.rating || 0,
            completedProjects: responseData.user.completedProjects || 0
          }),
          ...(responseData.user.role === 'buyer' && {
            preferences: responseData.user.preferences || {
              notifications: true,
              newsletter: false
            }
          })
        };

        console.log('🔐 Logging in user:', userToLogin);
        login(userToLogin);

        // Redirect based on actual role from backend
        const userRole = responseData.user.role;
        const redirectPath = userRole === 'seller' 
          ? '/seller-dashboard'
          : '/dashboard';
        
        console.log('🔄 Redirecting to:', redirectPath);
        navigate(redirectPath, { replace: true });
        
      } else {
        // If no user data in response, throw error
        console.error('❌ No user data received from backend');
        throw new Error('Login successful but no user data received. Please try again.');
      }

    } catch (err: unknown) {
      console.error('💥 Login error:', err);
      
      // Handle CORS errors specifically
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Network error: Cannot connect to server. Please check your connection or try again later.');
      } else if (err instanceof Error) {
        setError(err.message || 'An error occurred during login');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleUserTypeChange = (userType: 'buyer' | 'seller') => {
    setFormData(prev => ({ ...prev, userType }))
    if (error) setError('')
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Sign in to your account</h1>
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
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="block w-full py-3 pl-10 pr-3 placeholder-gray-400 transition-colors border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 transition-colors hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    `Sign in as ${formData.userType === 'seller' ? 'Seller' : 'Buyer'}`
                  )}
                </button>
              </div>
            </form>

            {/* CORS Troubleshooting Info */}
            <div className="p-4 mt-8 rounded-lg bg-yellow-50">
              <h3 className="mb-2 text-sm font-medium text-yellow-800">Troubleshooting</h3>
              <p className="text-xs text-yellow-700">
                If you're experiencing CORS errors, this is a backend configuration issue. 
                Please ensure your backend allows requests from: <code className="px-1 bg-yellow-100 rounded">https://service-two-sand.vercel.app</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="relative flex-1 hidden w-0 lg:block">
        <div className="absolute inset-0 w-full h-full">
          <img
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt="Authentication background"
          />
          <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-70"></div>
        </div>
        <div className="absolute text-white bottom-10 left-10">
          <h2 className="mb-2 text-2xl font-bold">
            {formData.userType === 'seller' 
              ? 'Grow Your Business With Us' 
              : 'Find Trusted Professionals'
            }
          </h2>
          <p className="max-w-md">
            {formData.userType === 'seller'
              ? 'Access your seller dashboard to manage projects, connect with clients, and grow your business.'
              : 'Access your account to find professionals, manage projects, and get your tasks done.'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login