import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LogoutPage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Start the logout process automatically
    const performLogout = async () => {
      setIsLoggingOut(true);
      
      // Countdown before redirect
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Wait for countdown to complete then logout
      setTimeout(async () => {
        try {
          await logout();
          // Redirect to home page after successful logout
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 500);
        } catch (error) {
          console.error('Logout error:', error);
          // Even if there's an error, redirect to home
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 500);
        }
      }, 3000);

      return () => clearInterval(countdownInterval);
    };

    performLogout();
  }, [logout, navigate]);

  const handleCancelLogout = () => {
    navigate(-1); // Go back to previous page
  };

  const handleImmediateLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
        {/* Loading Animation */}
        {isLoggingOut && (
          <div className="mb-6">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{countdown}</span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          {isLoggingOut ? (
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <svg 
                className="w-8 h-8 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
              <svg 
                className="w-8 h-8 text-yellow-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          )}
          
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {isLoggingOut ? 'Logging Out...' : 'Are you sure?'}
          </h1>
          
          <p className="text-gray-600">
            {isLoggingOut ? (
              `You'll be redirected in ${countdown} second${countdown !== 1 ? 's' : ''}...`
            ) : (
              `You're currently logged in as ${user?.name || user?.email}. Do you want to log out?`
            )}
          </p>
        </div>

        {/* User Info Card */}
        {user && !isLoggingOut && (
          <div className="p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center justify-center space-x-3">
              {user.avatar && (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="inline-block px-2 py-1 mt-1 text-xs font-medium text-blue-800 capitalize bg-blue-100 rounded-full">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!isLoggingOut ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleCancelLogout}
              className="flex-1 px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleImmediateLogout}
              className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Log Out
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span>Clearing your session...</span>
            </div>
            <button
              onClick={handleImmediateLogout}
              className="w-full px-6 py-3 font-semibold text-gray-600 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Log out immediately
            </button>
          </div>
        )}

        {/* Additional Info */}
        <div className="pt-6 mt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            You can always log back in with your credentials. 
            <Link to="/login" className="ml-1 font-semibold text-blue-600 hover:text-blue-800">
              Login page
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className="p-3 mt-4 border border-blue-200 rounded-lg bg-blue-50">
          <div className="flex items-start space-x-2">
            <svg 
              className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-xs text-left text-blue-700">
              For security reasons, we recommend logging out when you're done, especially on shared devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;