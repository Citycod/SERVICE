
import { useNavigate, useLocation } from 'react-router-dom';
import { XCircle, RefreshCw, CreditCard, Home } from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const error = location.state?.error || 'Payment processing failed. Please try again.';

  return (
    <div className="min-h-screen bg-neutral-lightGray">
      <div className="max-w-2xl mx-auto">
        <div className="p-6">
          <div className="card">
            <div className="p-8 text-center">
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-100 rounded-full">
                  <XCircle className="w-16 h-16 text-red-600" />
                </div>
              </div>

              {/* Error Message */}
              <h1 className="mb-2 text-2xl font-bold">Payment Failed</h1>
              <p className="mb-6 text-gray-600">{error}</p>

              {/* Troubleshooting Tips */}
              <div className="p-4 mb-6 rounded-lg bg-yellow-50">
                <h3 className="mb-2 font-semibold text-yellow-900">Troubleshooting Tips</h3>
                <ul className="space-y-1 text-sm text-left text-yellow-800">
                  <li>• Check your card details and try again</li>
                  <li>• Ensure you have sufficient funds</li>
                  <li>• Try a different payment method</li>
                  <li>• Contact your bank if issues persist</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
                
                <button 
                  onClick={() => navigate('/checkout')}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Use Different Payment Method
                </button>
                
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;