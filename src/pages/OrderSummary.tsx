import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface OrderItem {
  service: {
    id: string;
    title: string;
    price: number;
    delivery: string;
    seller: string;
    imageUrl: string;
  };
  quantity: number;
  totalPrice: number;
}

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order data from navigation state
    if (location.state) {
      setOrder(location.state as OrderItem);
    }
    setLoading(false);
  }, [location.state]);

  const handleProceedToCheckout = () => {
    if (order) {
      navigate('/checkout', { state: { order } });
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center animate-pulse">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full"></div>
        <div className="w-32 h-4 mx-auto bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  if (!order) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Order Not Found</h2>
        <p className="mb-6 text-gray-600">Please select a service to proceed with your order.</p>
        <Link to="/services" className="px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
          Browse Services
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container px-4 py-3 mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link to="/services" className="text-blue-600 hover:underline">Services</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">Order Summary</li>
          </ol>
        </div>
      </nav>

      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Order Summary</h1>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Order Details */}
            <div className="lg:col-span-2">
              <div className="p-6 bg-white shadow-sm rounded-xl">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Order Details</h2>
                
                {/* Service Item */}
                <div className="flex items-center p-4 mb-6 border border-gray-200 rounded-lg">
                  <img
                    src={order.service.imageUrl}
                    alt={order.service.title}
                    className="object-cover w-20 h-20 rounded-lg"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{order.service.title}</h3>
                    <p className="text-sm text-gray-600">Seller: {order.service.seller}</p>
                    <p className="text-sm text-gray-600">Delivery: {order.service.delivery}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₦{order.service.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                  </div>
                </div>

                {/* Order Information */}
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">₦{order.service.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-semibold text-gray-900">{order.quantity}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between py-4">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">₦{order.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Service Guarantees */}
              <div className="p-6 mt-6 bg-white shadow-sm rounded-xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Service Guarantees</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center p-3 rounded-lg bg-green-50">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Quality Guaranteed</h4>
                      <p className="text-sm text-gray-600">Professional service delivery</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-blue-50">
                    <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure Payment</h4>
                      <p className="text-sm text-gray-600">Your payment is protected</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-purple-50">
                    <svg className="w-6 h-6 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">On-time Delivery</h4>
                      <p className="text-sm text-gray-600">Guaranteed delivery time</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-orange-50">
                    <svg className="w-6 h-6 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Customer Support</h4>
                      <p className="text-sm text-gray-600">24/7 customer support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Summary */}
            <div className="lg:col-span-1">
              <div className="sticky p-6 bg-white shadow-lg rounded-xl top-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Complete Your Order</h3>
                
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold text-gray-900">{order.service.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold text-gray-900">{order.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-semibold text-gray-900">{order.service.delivery}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-blue-600">₦{order.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full px-6 py-4 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to={`/service/${order.service.id}`}
                  className="block w-full px-6 py-3 mt-3 font-semibold text-center text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Edit Order
                </Link>

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="text-sm text-center text-gray-600">
                    By proceeding, you agree to our{' '}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;