import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageCircle, 
  CheckCircle, 
  XCircle,
  Clock,  
  Package
} from 'lucide-react';

const OrderManagement = () => {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Alex Johnson',
      service: 'Traditional Dress Design',
      price: '₦45,000',
      orderDate: '2024-01-15',
      deadline: '2024-01-29',
      status: 'pending', // pending, confirmed, inProgress, completed, cancelled
      specifications: {
        size: 'Medium',
        color: 'Blue and Gold'
      }
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Miller',
      service: 'Modern Dress Design',
      price: '₦25,000',
      orderDate: '2024-01-14',
      deadline: '2024-01-21',
      status: 'confirmed',
      specifications: {
        size: 'Small',
        color: 'Red'
      }
    },
    {
      id: 'ORD-003',
      customer: 'Mike Brown',
      service: 'Custom Suit Tailoring',
      price: '₦35,000',
      orderDate: '2024-01-13',
      deadline: '2024-01-23',
      status: 'inProgress',
      specifications: {
        size: 'Large',
        color: 'Navy Blue'
      }
    }
  ]);

  // Navigation functions
  const handleViewOrderDetails = (orderId: string) => {
    navigate(`/order-tracking/${orderId}`);
  };

  const handleMessageCustomer = (customerName: string) => {
    navigate('/messaging', { 
      state: { 
        recipient: customerName,
        orderId: 'current-order-id' // You can pass actual order data here
      }
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
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

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      confirmed: CheckCircle,
      inProgress: Package,
      completed: CheckCircle,
      cancelled: XCircle
    };
    return icons[status as keyof typeof icons] || Clock;
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

  const getActionButtons = (order: typeof orders[0]) => {
    switch (order.status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => updateOrderStatus(order.id, 'confirmed')}
              className="px-3 py-1 text-sm text-green-700 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
            >
              Accept
            </button>
            <button
              onClick={() => updateOrderStatus(order.id, 'cancelled')}
              className="px-3 py-1 text-sm text-red-700 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
            >
              Decline
            </button>
          </div>
        );
      case 'confirmed':
        return (
          <button
            onClick={() => updateOrderStatus(order.id, 'inProgress')}
            className="px-3 py-1 text-sm text-blue-700 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
          >
            Start Work
          </button>
        );
      case 'inProgress':
        return (
          <button
            onClick={() => updateOrderStatus(order.id, 'completed')}
            className="px-3 py-1 text-sm text-green-700 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
          >
            Mark Complete
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-lightGray">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Order Management</h1>
              <p className="text-gray-600">Manage and track your service orders</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="card">
            <div className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="Search orders by customer or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center space-x-4">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="mt-6 space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              
              return (
                <div key={order.id} className="card">
                  <div className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{order.service}</h3>
                            <p className="text-sm text-gray-600">Order #{order.id}</p>
                          </div>
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{getStatusText(order.status)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
                          <div>
                            <span className="text-gray-600">Customer:</span>
                            <p className="font-medium">{order.customer}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Price:</span>
                            <p className="font-medium">{order.price}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Deadline:</span>
                            <p className="font-medium">{order.deadline}</p>
                          </div>
                        </div>

                        {/* Specifications */}
                        <div className="p-2 mt-3 rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-600">
                            <strong>Specifications:</strong> {order.specifications.size}, {order.specifications.color}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 md:items-end">
                        {getActionButtons(order)}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewOrderDetails(order.id)}
                            className="p-2 text-gray-400 transition-colors rounded-lg hover:bg-gray-100 hover:text-gray-600"
                            title="View Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMessageCustomer(order.customer)}
                            className="p-2 text-gray-400 transition-colors rounded-lg hover:bg-gray-100 hover:text-gray-600"
                            title="Message Customer"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredOrders.length === 0 && (
              <div className="card">
                <div className="p-8 text-center">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold">No orders found</h3>
                  <p className="text-gray-600">
                    {searchTerm || statusFilter !== 'all' 
                      ? "No orders match your current filters. Try adjusting your search criteria." 
                      : "You don't have any orders yet. Orders will appear here when customers book your services."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;