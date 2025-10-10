
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Download, Share2, Home, Package } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const order = location.state?.order || {
    id: '12345',
    service: 'Traditional Wedding Attire Design',
    seller: 'Chiamaka Okoro',
    amount: '₦45,000',
    estimatedDelivery: '2024-01-29'
  };

  return (
    <div className="min-h-screen bg-neutral-lightGray">
      <div className="max-w-2xl mx-auto">
        <div className="p-6">
          <div className="card">
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <h1 className="mb-2 text-2xl font-bold">Payment Successful!</h1>
              <p className="mb-6 text-gray-600">
                Thank you for your order. Your payment has been processed successfully.
              </p>

              {/* Order Summary */}
              <div className="p-4 mb-6 rounded-lg bg-gray-50">
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{order.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium text-green-600">{order.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">{order.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="p-4 mb-6 rounded-lg bg-blue-50">
                <h3 className="mb-2 font-semibold text-blue-900">What's Next?</h3>
                <ul className="space-y-1 text-sm text-left text-blue-800">
                  <li>• The seller will contact you within 24 hours</li>
                  <li>• You can track your order in "My Orders"</li>
                  <li>• Message the seller anytime for updates</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/order-tracking/${order.id}`)}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Track Your Order
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" />
                    Receipt
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                </div>
                
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

export default PaymentSuccess;