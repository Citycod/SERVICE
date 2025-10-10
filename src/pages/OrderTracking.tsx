import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  Package, 
  User, 
  MapPin, 
  MessageCircle,
  Phone,
  Mail,
  Star
} from 'lucide-react';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock order data - replace with API call
  const [order] = useState({
    id: id || '12345',
    service: 'Traditional Wedding Attire Design',
    seller: 'Chiamaka Okoro',
    price: '₦45,000',
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-01-29',
    status: 'completed', // Changed to completed to test review button
    timeline: [
      { status: 'ordered', title: 'Order Placed', description: 'Your order has been received', date: '2024-01-15 10:30 AM', completed: true },
      { status: 'confirmed', title: 'Order Confirmed', description: 'Seller has accepted your order', date: '2024-01-15 2:15 PM', completed: true },
      { status: 'inProgress', title: 'In Progress', description: 'Seller is working on your order', date: '2024-01-16 9:00 AM', completed: true },
      { status: 'review', title: 'Ready for Review', description: 'Waiting for your approval', date: '2024-01-25 11:00 AM', completed: true },
      { status: 'completed', title: 'Completed', description: 'Order delivered successfully', date: '2024-01-28 3:20 PM', completed: true },
    ],
    sellerContact: {
      phone: '+234 801 234 5678',
      email: 'chiamaka@fashionhouse.com'
    },
    specifications: {
      size: 'Medium',
      color: 'Blue and Gold',
      fabric: 'Ankara',
      notes: 'Please include traditional embroidery patterns'
    }
  });

  // Add this function to OrderTracking component
  const handleLeaveReview = (orderId: string) => {
    navigate(`/review/${orderId}`, { 
      state: { 
        order: {
          id: orderId,
          service: order.service,
          seller: order.seller,
          completedDate: new Date().toISOString().split('T')[0]
        }
      }
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      inProgress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      inProgress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="min-h-screen bg-neutral-lightGray">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 transition-colors rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Order Tracking</h1>
                <p className="text-gray-600">Order # {order.id}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Timeline */}
          <div className="card">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold">Order Progress</h2>
              <div className="space-y-4">
                {order.timeline.map((step, index) => (
                  <div key={step.status} className="flex space-x-4">
                    {/* Timeline line and dot */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className={`flex-1 w-0.5 mt-2 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                        <span className="text-sm text-gray-500">{step.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Details & Contact */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Order Details */}
            <div className="card">
              <div className="p-6">
                <h3 className="mb-4 font-semibold">Order Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{order.service}</p>
                      <p className="text-sm text-gray-600">Service</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{order.seller}</p>
                      <p className="text-sm text-gray-600">Seller</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">₦45,000</p>
                      <p className="text-sm text-gray-600">Total Amount</p>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="mt-6">
                  <h4 className="mb-3 font-semibold">Specifications</h4>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{order.specifications.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium">{order.specifications.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fabric:</span>
                        <span className="font-medium">{order.specifications.fabric}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Notes:</span>
                        <p className="font-medium">{order.specifications.notes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Contact */}
            <div className="card">
              <div className="p-6">
                <h3 className="mb-4 font-semibold">Contact Seller</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 space-x-3 rounded-lg bg-gray-50">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{order.seller}</p>
                      <p className="text-sm text-gray-600">Service Provider</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/messaging')}
                    className="flex items-center w-full p-3 space-x-3 transition-colors rounded-lg hover:bg-blue-50 group"
                  >
                    <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    <span className="font-medium">Send Message</span>
                  </button>

                  <div className="p-3 space-y-2 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{order.sellerContact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{order.sellerContact.email}</span>
                    </div>
                  </div>

                  <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                    <p className="text-sm text-blue-800">
                      <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4">
            {/* Add a "Leave Review" button in the completed order state */}
            {order.status === 'completed' && (
              <button
                onClick={() => handleLeaveReview(order.id)}
                className="w-full btn btn-primary"
              >
                <Star className="w-4 h-4 mr-2" />
                Leave Review
              </button>
            )}
            
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/messaging')}
                className="flex-1 btn btn-primary"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Seller
              </button>
              <button 
                onClick={() => navigate('/my-orders')}
                className="flex-1 btn btn-ghost"
              >
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;