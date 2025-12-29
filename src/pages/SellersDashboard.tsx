/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../utils/supabase";
import {
  Home,
  Briefcase,
  Settings,
  Wallet,
  Plus,
  Star,
  TrendingUp,
  ArrowRight,
  LogOut,
  User,
  BarChart3,
  CreditCard,
} from "lucide-react";

interface RecentOrder {
  id: string;
  created_at: string;
  status: string;
  amount: number;
  service: { title: string };
  buyer: { full_name: string };
}

const SellersDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeOrders: 0,
    totalEarnings: 0,
    serviceCount: 0,
    satisfactionRate: 98,
    repeatCustomers: 85
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);

  useEffect(() => {
    if (user) {
      fetchSellerData();
    }
  }, [user]);

  const fetchSellerData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Active Orders Count
      const { count: activeCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('seller_id', user?.id)
        .in('status', ['pending', 'in_progress']);

      // 2. Fetch Total Earnings (Completed Orders)
      const { data: earningsData } = await supabase
        .from('orders')
        .select('amount')
        .eq('seller_id', user?.id)
        .eq('status', 'completed');

      const totalEarnings = earningsData?.reduce((sum, order) => sum + order.amount, 0) || 0;

      // 3. Fetch Service Count
      const { count: serviceCount } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true })
        .eq('seller_id', user?.id)
        .eq('status', 'approved');

      setStats(prev => ({
        ...prev,
        activeOrders: activeCount || 0,
        totalEarnings,
        serviceCount: serviceCount || 0
      }));

      // 4. Fetch Recent Orders
      const { data: orders } = await supabase
        .from('orders')
        .select(`
          id, created_at, status, amount,
          service:services(title),
          buyer:profiles!orders_buyer_id_fkey(full_name)
        `)
        .eq('seller_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (orders) {
        const transformedOrders = orders.map((order: any) => ({
          id: order.id,
          created_at: order.created_at,
          status: order.status,
          amount: order.amount,
          service: Array.isArray(order.service) ? order.service[0] : order.service,
          buyer: Array.isArray(order.buyer) ? order.buyer[0] : order.buyer
        }));
        setRecentOrders(transformedOrders);
      }

    } catch (error) {
      console.error('Error fetching seller data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickStats = [
    { label: "Active Orders", value: stats.activeOrders.toString(), change: "Orders to fulfill", icon: "📋" },
    { label: "Total Earned", value: `₦${stats.totalEarnings.toLocaleString()}`, change: "All time", icon: "💳" },
    { label: "Services Listed", value: stats.serviceCount.toString(), change: "Active services", icon: "🛠️" },
  ];

  const getActivityIcon = (status: string) => {
    if (status === 'completed') return TrendingUp;
    if (status === 'pending') return Briefcase;
    return Star;
  };

  // Function to handle order click
  const handleOrderClick = (orderId: string) => {
    navigate(`/order-tracking/${orderId}`);
  };

  // Function to handle order management navigation
  const handleOrderManagement = () => {
    navigate("/order-management");
  };

  // Function to handle analytics navigation
  const handleAnalytics = () => {
    navigate("/analytics");
  };

  // Function to handle withdrawal navigation
  const handleWithdrawal = () => {
    navigate("/withdrawal");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-lightGray">
        <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-lightGray animate-fade-in">
      <div className="flex mx-auto max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-64 bg-white shadow-sm lg:block">
          <div className="p-6">
            <div className="space-y-1">
              <button className="justify-start w-full btn btn-ghost text-primary-blue bg-primary-blue/10">
                <Home className="w-4 h-4 mr-3" />
                Seller Dashboard
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={() => navigate("/create-service")}
              >
                <Plus className="w-4 h-4 mr-3" />
                Create Service
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={() => navigate("/manage-services")}
              >
                <Settings className="w-4 h-4 mr-3" />
                Manage Services
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={handleOrderManagement}
              >
                <Briefcase className="w-4 h-4 mr-3" />
                Orders
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={() => navigate("/earnings")}
              >
                <Wallet className="w-4 h-4 mr-3" />
                Earnings
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={handleWithdrawal}
              >
                <CreditCard className="w-4 h-4 mr-3" />
                Withdraw Funds
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={handleAnalytics}
              >
                <BarChart3 className="w-4 h-4 mr-3" />
                Analytics
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={() => navigate("/sellers-profile")}
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - Orders & Stats */}
            <div className="space-y-6 lg:col-span-2">
              {/* Recent Orders */}
              <div className="card">
                <div className="flex flex-row items-center justify-between p-6">
                  <h2 className="text-lg font-semibold">Recent Orders</h2>
                  <button className="btn btn-ghost" onClick={handleOrderManagement}>
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 pt-0">
                  <p className="mb-4 text-sm text-neutral-textGray">
                    Stay updated with your latest orders and payments.
                  </p>
                  {recentOrders.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">No orders yet.</div>
                  ) : (
                    <div className="space-y-4">
                      {recentOrders.map((order) => {
                        const IconComponent = getActivityIcon(order.status);
                        const orderText = `Order for '${order.service?.title || 'Service'}' from ${order.buyer?.full_name || 'Buyer'}`;
                        const timeText = new Date(order.created_at).toLocaleDateString();

                        return (
                          <div
                            key={order.id}
                            className="flex items-start p-3 space-x-3 transition-colors rounded-lg cursor-pointer hover:bg-primary-blue/10"
                            onClick={() => handleOrderClick(order.id)}
                          >
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue/10">
                                <IconComponent className="w-4 h-4 text-primary-blue" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">{orderText}</p>
                              <p className="mt-1 text-xs text-neutral-textGray">
                                {timeText} • ₦{order.amount.toLocaleString()} • <span className="capitalize">{order.status}</span>
                              </p>
                            </div>
                            <button
                              className="btn btn-ghost"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click
                                handleOrderClick(order.id);
                              }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {quickStats.map((stat, index) => (
                  <div key={index} className="card">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-neutral-textGray">{stat.label}</p>
                        {stat.icon && <span className="text-lg">{stat.icon}</span>}
                      </div>
                      <h3 className="stat-number">{stat.value}</h3>
                      <p className="text-xs text-neutral-textGray">{stat.change}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Analytics Preview */}
              <div className="card">
                <div className="flex flex-row items-center justify-between p-6">
                  <h2 className="text-lg font-semibold">Performance Overview</h2>
                  <button className="btn btn-ghost" onClick={handleAnalytics}>
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 pt-0">
                  <p className="mb-4 text-sm text-neutral-textGray">
                    Track your business growth and performance metrics.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-blue-50">
                      <div className="text-2xl font-bold text-blue-600">94%</div>
                      <div className="text-sm text-blue-800">Satisfaction Rate</div>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50">
                      <div className="text-2xl font-bold text-green-600">87%</div>
                      <div className="text-sm text-green-800">Repeat Customers</div>
                    </div>
                  </div>
                  <button
                    onClick={handleAnalytics}
                    className="w-full mt-4 btn btn-ghost"
                  >
                    View Detailed Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Seller Profile & Quick Actions */}
            <div className="space-y-6">
              {/* Seller Profile Card */}
              <div className="card">
                <div className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-blue to-primary-dark">
                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/20">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
                      alt="Chiamaka Okoro"
                      className="w-16 h-16 mx-auto mb-3 rounded-full"
                    />
                    <h3 className="text-lg font-semibold">Chiamaka Okoro</h3>
                    <p className="text-sm text-neutral-textGray">Fashion Designer</p>
                  </div>

                  <div className="space-y-4">
                    <div className="badge bg-primary-blue/10 border-primary-blue/20">
                      <div className="w-2 h-2 mr-2 rounded-full bg-primary-blue"></div>
                      <span className="text-sm font-medium">Verified Seller</span>
                    </div>
                    <p className="text-xs text-neutral-textGray">
                      4.9 rating • 230 reviews
                    </p>

                    <div className="py-2 text-center">
                      <div className="text-2xl font-bold">₦250,000</div>
                      <div className="text-xs text-neutral-textGray">Available Balance</div>
                    </div>

                    <div className="space-y-2">
                      <button
                        className="w-full btn btn-primary"
                        onClick={() => navigate("/create-service")}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Service
                      </button>
                      <button
                        className="w-full btn btn-primary"
                        onClick={handleWithdrawal}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Withdraw Funds
                      </button>
                      <button
                        className="w-full btn btn-primary"
                        onClick={() => navigate("/sellers-profile")}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </button>
                      <button
                        className="w-full btn btn-ghost"
                        onClick={() => navigate("/settings")}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </button>
                      <button
                        className="w-full text-red-600 border-red-600 btn btn-ghost hover:bg-red-600 hover:text-white"
                        onClick={() => navigate("/logout-page")}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
                  <div className="space-y-3">
                    <button
                      className="justify-start w-full btn btn-ghost"
                      onClick={() => navigate("/create-service")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Service
                    </button>
                    <button
                      className="justify-start w-full btn btn-ghost"
                      onClick={() => navigate("/manage-services")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Services
                    </button>
                    <button
                      className="justify-start w-full btn btn-ghost"
                      onClick={handleOrderManagement}
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Manage Orders
                    </button>
                    <button
                      className="justify-start w-full btn btn-ghost"
                      onClick={handleWithdrawal}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Withdraw Funds
                    </button>
                    <button
                      className="justify-start w-full btn btn-ghost"
                      onClick={handleAnalytics}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </button>
                    <button
                      className="justify-start w-full btn btn-ghost"
                      onClick={() => navigate("/earnings")}
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Earnings Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Earnings Summary */}
              <div className="card">
                <div className="p-6">
                  <h3 className="mb-4 font-semibold">Earnings Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-textGray">This Month</span>
                      <span className="font-semibold">₦150,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-textGray">Last Month</span>
                      <span className="font-semibold">₦125,000</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm font-semibold">Available for Withdrawal</span>
                      <span className="font-semibold text-green-600">₦250,000</span>
                    </div>
                    <button
                      onClick={handleWithdrawal}
                      className="w-full mt-2 btn btn-primary btn-sm"
                    >
                      Withdraw Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellersDashboard;
