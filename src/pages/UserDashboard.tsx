/* eslint-disable @typescript-eslint/no-unused-vars */

import { useNavigate } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Briefcase,
  Settings,
  Search,
  
  LogOut,
  User,
  Eye,
  Star,
  TrendingUp,
  
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = "123"; // Mock user ID for Alex Johnson; replace with actual user ID from auth

  // Customer activity data
  const recentActivities = [
    {
      id: 1,
      type: "message",
      text: "New message from Creative Solutions regarding your logo design order.",
      time: "2 hours ago",
      icon: MessageCircle,
    },
    {
      id: 2,
      type: "order",
      text: "Your 'Website Development' order has been delivered by Jane Smith.",
      time: "Yesterday",
      icon: Briefcase,
    },
    {
      id: 3,
      type: "payment",
      text: "Payment of ₦250,000 processed for 'Logo Design' service via Paystack.",
      time: "Yesterday",
      icon: TrendingUp,
    },
    {
      id: 4,
      type: "review",
      text: "Please review your completed 'Brand Identity' project.",
      time: "Last week",
      icon: Star,
    },
    {
      id: 5,
      type: "recommendation",
      text: "New recommended services based on your recent purchases.",
      time: "1 day ago",
      icon: Eye,
    },
  ];

  const quickStats = [
    { label: "Active Orders", value: "3", change: "2 in progress, 1 pending delivery" },
    { label: "Total Spent", value: "₦1,850,000", change: "This month", icon: "💳" },
    { label: "Saved Services", value: "12", change: "Services in your wishlist", icon: "❤️" },
  ];

  const getActivityIcon = (type: string) => {
    const icons = {
      message: MessageCircle,
      order: Briefcase,
      payment: TrendingUp,
      review: Star,
      recommendation: Eye,
    };
    return icons[type as keyof typeof icons] || MessageCircle;
  };

  return (
    <div className="min-h-screen bg-neutral-lightGray animate-fade-in">
      {/* Header (Commented Out) */}
      {/* <header className="bg-white border-b shadow-sm">
        <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-primary-blue">✦</div>
            <nav className="flex items-center space-x-6">
              <button className="font-medium btn btn-ghost text-primary-blue">
                Dashboard
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => navigate("/profile-settings")}
              >
                Profile Settings
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="max-w-md search-container">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-neutral-textGray" />
              <input
                placeholder="Search for sellers or services..."
                className="search-input"
              />
            </div>
            <button className="btn btn-ghost">
              <Bell className="w-5 h-5" />
            </button>
            <div className="relative">
              <button className="w-8 h-8 rounded-full btn btn-ghost">
                <img
                  src="/lovable-Uploads/80542ed3-0db1-42a6-af13-adbba7510682.png"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              <div className="absolute right-0 hidden w-56 mt-2 bg-white shadow-md rounded-xl">
                <button className="flex items-center w-full px-4 py-2 text-sm text-neutral-textGray hover:bg-neutral-lightGray">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      <div className="flex mx-auto max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-64 bg-white shadow-sm lg:block">
          <div className="p-6">
            <div className="space-y-1">
              <button className="justify-start w-full btn btn-ghost text-primary-blue bg-primary-blue/10">
                <Home className="w-4 h-4 mr-3" />
                Home
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={() => navigate("/messaging")}
              >
                <MessageCircle className="w-4 h-4 mr-3" />
                Messages
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={() => navigate("/my-orders")}
              >
                <Briefcase className="w-4 h-4 mr-3" />
                My Orders
              </button>
              <button
                className="justify-start w-full btn btn-ghost"
                onClick={() => navigate("/profile-settings")}
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Section (Commented Out) */}
          {/* <div className="mb-8">
            <p className="mb-2 text-sm text-neutral-textGray">
              Tuesday, September 9th, 2025
            </p>
            <h1 className="section-title">Good Morning, Alex Johnson.</h1>

            {/* Search Bar */}
            {/* <div className="flex items-center mb-6 space-x-4">
              <div className="max-w-md search-container">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-neutral-textGray" />
                <input
                  placeholder="Search for services, projects, or clients..."
                  className="search-input"
                />
                <button className="search-button">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div> */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - Activities & Stats */}
            <div className="space-y-6 lg:col-span-2">
              {/* Recent Activities */}
              <div className="card">
                <div className="flex flex-row items-center justify-between p-6">
                  <h2 className="text-lg font-semibold">Recent Activities</h2>
                  <button className="btn btn-ghost">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 pt-0">
                  <p className="mb-4 text-sm text-neutral-textGray">
                    Stay updated with your latest interactions.
                  </p>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div
                          key={activity.id}
                          className="flex items-start p-3 space-x-3 transition-colors rounded-lg hover:bg-primary-blue/10"
                        >
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue/10">
                              <IconComponent className="w-4 h-4 text-primary-blue" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{activity.text}</p>
                            <p className="mt-1 text-xs text-neutral-textGray">
                              {activity.time}
                            </p>
                          </div>
                          <button className="btn btn-ghost">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
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

              {/* Recommended Services */}
              <div className="card">
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Recommended Services</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="p-4 card">
                      <h3 className="text-sm font-medium">Logo Design</h3>
                      <p className="text-xs text-neutral-textGray">Starting at ₦50,000</p>
                      <button
                        className="mt-2 btn btn-primary"
                        onClick={() => navigate("/browse-services")}
                      >
                        View Service
                      </button>
                    </div>
                    <div className="p-4 card">
                      <h3 className="text-sm font-medium">Web Development</h3>
                      <p className="text-xs text-neutral-textGray">Starting at ₦150,000</p>
                      <button
                        className="mt-2 btn btn-primary"
                        onClick={() => navigate("/browse-services")}
                      >
                        View Service
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Section */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="card">
                <div className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-blue to-primary-dark">
                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/20">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <img
                      src="/lovable-Uploads/80542ed3-0db1-42a6-af13-adbba7510682.png"
                      alt="Avatar"
                      className="w-16 h-16 mx-auto mb-3 rounded-full"
                    />
                    <h3 className="text-lg font-semibold">Alex Johnson</h3>
                    <p className="text-sm text-neutral-textGray">Premium Customer</p>
                  </div>

                  <div className="space-y-4">
                    <div className="badge bg-primary-blue/10 border-primary-blue/20">
                      <div className="w-2 h-2 mr-2 rounded-full bg-primary-blue"></div>
                      <span className="text-sm font-medium">Premium Member</span>
                    </div>
                    <p className="text-xs text-neutral-textGray">
                      Access to priority support and exclusive services
                    </p>

                    <div className="py-2 text-center">
                      <div className="text-2xl font-bold">₦150,000</div>
                      <div className="text-xs text-neutral-textGray">Account Balance</div>
                    </div>

                    <div className="space-y-2">
                      <button
                        className="w-full btn btn-primary"
                        onClick={() => navigate("/browse-services")}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Browse Services
                      </button>
                      <button
                        className="w-full btn btn-primary"
                        onClick={() => navigate(`/profile/${userId}`)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </button>
                      <button
                        className="w-full btn btn-ghost"
                        onClick={() => navigate("/profile-settings")}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </button>
                      <button
                        className="w-full text-red-600 border-red-600 btn btn-ghost hover:bg-red-600 hover:text-white"
                        
                      >
                        <LogOut className="w-4 h-4 mr-2" onClick={() => navigate("/logout-page")}/>
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
                      onClick={() => navigate("/browse-services")}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Browse Services
                    </button>
                    <button
                      className="justify-start w-full btn btn-ghost"
                      onClick={() => navigate("/my-orders")}
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      My Orders
                    </button>
                    <button
                      className="justify-start w-full btn btn-ghost"
                      onClick={() => navigate("/messaging")}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Messages
                    </button>
                    <button
                      className="justify-start w-full btn btn-ghost"
                      onClick={() => navigate("/favorites")}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Saved Services
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Preferences */}
              <div className="card">
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Service Preferences</h2>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Categories:</strong> Graphic Design, Web Development</p>
                    <p className="text-sm"><strong>Budget Range:</strong> ₦50,000 - ₦200,000</p>
                    <p className="text-sm"><strong>Timeline:</strong> 1-2 weeks</p>
                    <button className="btn btn-ghost">Edit Preferences</button>
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


export default Dashboard;
