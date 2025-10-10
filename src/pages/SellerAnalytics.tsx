/* eslint-disable @typescript-eslint/no-unused-vars */

import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Eye, 
  Star, 
  ShoppingCart,
  DollarSign,
  Calendar,
  Download
} from 'lucide-react';

const SellerAnalytics = () => {
  const navigate = useNavigate();

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 750000,
      activeOrders: 5,
      completedOrders: 47,
      averageRating: 4.9
    },
    revenueData: [
      { month: 'Jan', revenue: 450000 },
      { month: 'Feb', revenue: 520000 },
      { month: 'Mar', revenue: 480000 },
      { month: 'Apr', revenue: 610000 },
      { month: 'May', revenue: 580000 },
      { month: 'Jun', revenue: 750000 },
    ],
    popularServices: [
      { name: 'Traditional Wedding Attire', orders: 23, revenue: 1035000 },
      { name: 'Modern Dress Design', orders: 15, revenue: 375000 },
      { name: 'Custom Suit Tailoring', orders: 12, revenue: 420000 },
      { name: 'Bridal Party Outfits', orders: 8, revenue: 320000 },
    ],
    recentReviews: [
      { customer: 'Alex Johnson', rating: 5, comment: 'Excellent work! Perfect fit and beautiful design.', date: '2 days ago' },
      { customer: 'Sarah Miller', rating: 4, comment: 'Very professional and delivered on time. Would recommend!', date: '1 week ago' },
      { customer: 'Mike Brown', rating: 5, comment: 'Amazing attention to detail. Exceeded expectations!', date: '2 weeks ago' },
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-neutral-lightGray">
      <div className="mx-auto max-w-7xl">
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
                <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                <p className="text-gray-600">Track your business performance and growth</p>
              </div>
            </div>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Cards */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Revenue */}
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Total Revenue</h3>
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(analyticsData.overview.totalRevenue)}
                </div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12.5% from last month</span>
                </div>
              </div>
            </div>

            {/* Active Orders */}
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Active Orders</h3>
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {analyticsData.overview.activeOrders}
                </div>
                <p className="mt-2 text-sm text-gray-600">In progress</p>
              </div>
            </div>

            {/* Completed Orders */}
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Completed Orders</h3>
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {analyticsData.overview.completedOrders}
                </div>
                <p className="mt-2 text-sm text-gray-600">All time</p>
              </div>
            </div>

            {/* Average Rating */}
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Average Rating</h3>
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className={`text-2xl font-bold ${getRatingColor(analyticsData.overview.averageRating)}`}>
                  {analyticsData.overview.averageRating}/5
                </div>
                <p className="mt-2 text-sm text-gray-600">Based on 47 reviews</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue Chart */}
            <div className="card">
              <div className="p-6">
                <h3 className="mb-6 text-lg font-semibold">Revenue Overview</h3>
                <div className="space-y-4">
                  {analyticsData.revenueData.map((item) => (
                    <div key={item.month} className="flex items-center justify-between">
                      <span className="w-12 text-sm font-medium text-gray-700">{item.month}</span>
                      <div className="flex-1 mx-4">
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="inline-block text-xs font-semibold text-blue-600">
                                {formatCurrency(item.revenue)}
                              </div>
                            </div>
                          </div>
                          <div className="flex h-2 overflow-hidden text-xs bg-blue-200 rounded">
                            <div
                              style={{ width: `${(item.revenue / 800000) * 100}%` }}
                              className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-20 text-sm text-right text-gray-500">
                        {((item.revenue / 800000) * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Services */}
            <div className="card">
              <div className="p-6">
                <h3 className="mb-6 text-lg font-semibold">Popular Services</h3>
                <div className="space-y-4">
                  {analyticsData.popularServices.map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.orders} orders</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{formatCurrency(service.revenue)}</div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="mt-6 card">
            <div className="p-6">
              <h3 className="mb-6 text-lg font-semibold">Recent Reviews</h3>
              <div className="space-y-4">
                {analyticsData.recentReviews.map((review, index) => (
                  <div key={index} className="flex items-start p-4 space-x-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                        <span className="text-sm font-semibold text-blue-600">
                          {review.customer.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{review.customer}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{review.rating}.0</span>
                        </div>
                      </div>
                      <p className="mb-2 text-sm text-gray-600">{review.comment}</p>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-6 mt-6 md:grid-cols-3">
            <div className="card">
              <div className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">1,247</div>
                <p className="text-sm text-gray-600">Profile Views</p>
              </div>
            </div>

            <div className="card">
              <div className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">87%</div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
            </div>

            <div className="card">
              <div className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">94%</div>
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;
