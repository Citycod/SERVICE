/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MessageCircle,
  Star,
  TrendingUp,
  User,
  MapPin,
  Calendar,
  Award,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  Heart,
  Users,
  Clock,
  ArrowLeft,
} from "lucide-react";

// Import the shared types
import type { Seller, Service } from '../types/seller';

const SellersProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("services");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [sellerServices, setSellerServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data that matches the ServiceDetails structure
  const mockSeller: Seller = {
    id: "seller1",
    name: "Oluwaseun Adeyemi",
    businessName: "Oluwaseun Plumbing Services",
    profession: "Certified Plumber",
    description: "Expert plumbing repair services for leaks, pipes, and fixtures. Our certified plumbers provide quick and reliable solutions for all your plumbing needs. With over 5 years of experience in residential and commercial plumbing.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    coverImage: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    rating: 4.7,
    reviews: 50,
    completedOrders: 247,
    responseRate: 98,
    responseTime: "1 hour",
    location: "Lagos, Nigeria",
    joinedDate: "March 2020",
    email: "oluwaseun@plumbing.com",
    phone: "+234 801 234 5678",
    website: "www.oluwaseunplumbing.com",
    socialMedia: {
      instagram: "@oluwaseun_plumbing",
      facebook: "Oluwaseun Plumbing Services",
    },
    verificationStatus: "verified",
    categories: ["Plumbing", "Emergency Repair", "Pipe Installation"],
    skills: ["Leak Repair", "Pipe Installation", "Emergency Services", "Fixture Installation"],
    followers: 890,
    following: 156,
    bio: "Certified plumber with over 8 years of experience in residential and commercial plumbing. Specialized in emergency repairs and pipe installations.",
    specialties: ["Emergency Plumbing", "Pipe Installation", "Leak Repair", "Water Heater Installation"]
  };

  const mockServices: Service[] = [
    {
      id: "1",
      title: "Professional Plumbing Repair",
      description: "Expert plumbing repair services for leaks, pipes, and fixtures. Our certified plumbers provide quick and reliable solutions for all your plumbing needs.",
      price: 15000,
      delivery: "1 day",
      seller: mockSeller,
      reviews: [
        { id: '1', text: 'Fixed my leak quickly and professionally!', rating: 5, user: 'John Adebayo', date: '2023-10-15', verified: true },
        { id: '2', text: 'Great service and fair pricing.', rating: 4.5, user: 'Mary Johnson', date: '2023-09-22', verified: true },
      ],
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Plumbing",
      whatsappNumber: "+2348012345678",
      portfolioImages: [
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
      ],
      features: ["24/7 Emergency Service", "Free Initial Inspection", "6 Months Warranty"],
      requirements: ["Clear access to plumbing area", "Water supply turned off"],
      tags: ["Emergency", "Residential", "Commercial"]
    },
    {
      id: "2",
      title: "Pipe Installation Service",
      description: "Professional pipe installation and replacement services for residential and commercial properties.",
      price: 25000,
      delivery: "2 days",
      seller: mockSeller,
      reviews: [
        { id: '1', text: 'Excellent pipe installation work!', rating: 5, user: 'David Smith', date: '2023-11-10', verified: true },
      ],
      imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
      category: "Plumbing",
      whatsappNumber: "+2348012345678",
      portfolioImages: [],
      features: ["Modern Piping Materials", "Professional Installation", "Quality Guarantee"],
      requirements: ["Site assessment required", "Access to installation area"],
      tags: ["Installation", "Pipes", "Professional"]
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch seller data
    const fetchSellerData = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch by ID: `/api/sellers/${id}`
        setTimeout(() => {
          setSeller(mockSeller);
          setSellerServices(mockServices);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching seller data:', error);
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  const stats = [
    { label: "Completed Orders", value: seller?.completedOrders || 0, icon: CheckCircle },
    { label: "Response Rate", value: `${seller?.responseRate || 0}%`, icon: MessageCircle },
    { label: "Avg. Response Time", value: seller?.responseTime || "N/A", icon: TrendingUp },
    { label: "Years Experience", value: "5+", icon: Award },
  ];

  const handleMessageSeller = () => {
    if (seller) {
      navigate('/messaging', { 
        state: { 
          recipient: {
            id: seller.id,
            name: seller.name,
            avatar: seller.avatar,
            role: 'seller'
          },
          initialMessage: `Hi ${seller.name}, I'm interested in your services and would like to know more about your work.`
        } 
      })
    }
  }

  const handleContactSeller = () => {
    setShowContactModal(true);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleViewService = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  const handleBackToServices = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-lightGray">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full"></div>
          <div className="w-32 h-4 mx-auto bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-lightGray">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Seller Not Found</h2>
          <p className="mb-6 text-gray-600">The seller you're looking for doesn't exist.</p>
          <button 
            onClick={handleBackToServices}
            className="px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-lightGray animate-fade-in">
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">Contact {seller.name}</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 border rounded-lg">
                <Phone className="w-5 h-5 mr-3 text-primary-blue" />
                <div>
                  <p className="text-sm text-neutral-textGray">Phone</p>
                  <p className="font-semibold">{seller.phone}</p>
                </div>
              </div>
              <div className="flex items-center p-3 border rounded-lg">
                <Mail className="w-5 h-5 mr-3 text-primary-blue" />
                <div>
                  <p className="text-sm text-neutral-textGray">Email</p>
                  <p className="font-semibold">{seller.email}</p>
                </div>
              </div>
              <div className="flex items-center p-3 border rounded-lg">
                <Globe className="w-5 h-5 mr-3 text-primary-blue" />
                <div>
                  <p className="text-sm text-neutral-textGray">Website</p>
                  <p className="font-semibold">{seller.website}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowContactModal(false)}
                className="flex-1 btn btn-ghost"
              >
                Close
              </button>
              <button 
                onClick={handleMessageSeller}
                className="btn btn-primary"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex mx-auto max-w-7xl">
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Header with Back Button */}
          <div className="p-4 bg-white border-b">
            <div className="container mx-auto">
              <button 
                onClick={handleBackToServices}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Service
              </button>
            </div>
          </div>

          {/* Cover Photo */}
          <div className="relative h-64 bg-gradient-to-r from-primary-blue to-primary-dark">
            <img
              src={seller.coverImage}
              alt="Cover"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Profile Header */}
          <div className="px-6 -mt-16">
            <div className="card">
              <div className="p-6">
                <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={seller.avatar}
                      alt={seller.name}
                      className="w-32 h-32 border-4 border-white shadow-lg rounded-2xl"
                    />
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-2xl font-bold">{seller.name}</h1>
                          {seller.verificationStatus === "verified" && (
                            <div className="text-green-800 bg-green-100 border-green-200 badge">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </div>
                          )}
                        </div>
                        <p className="mb-2 text-lg text-neutral-textGray">{seller.profession}</p>
                        <div className="flex items-center gap-4 text-sm text-neutral-textGray">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{seller.rating}</span>
                            <span>({seller.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {seller.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Joined {seller.joinedDate}
                          </div>
                        </div>

                        {/* Social Stats */}
                        <div className="flex gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span className="font-semibold">{seller.followers}</span>
                            <span className="text-neutral-textGray">Followers</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">{seller.following}</span>
                            <span className="text-neutral-textGray">Following</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={handleFollow}
                          className={`btn ${isFollowing ? 'btn-ghost' : 'btn-primary'}`}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                          {isFollowing ? 'Following' : 'Follow'}
                        </button>
                        <button 
                          onClick={handleMessageSeller}
                          className="btn btn-primary"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </button>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-6 md:grid-cols-4">
                      {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                          <div key={index} className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-lg bg-primary-blue/10">
                              <IconComponent className="w-6 h-6 text-primary-blue" />
                            </div>
                            <div className="text-lg font-semibold">{stat.value}</div>
                            <div className="text-xs text-neutral-textGray">{stat.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <p className="leading-relaxed text-neutral-textGray">
                    {seller.description}
                  </p>
                </div>

                {/* Categories & Skills */}
                <div className="grid gap-6 mt-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-semibold">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {seller.categories.map((category, index) => (
                        <span key={index} className="badge badge-outline">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-semibold">Skills & Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {seller.skills.map((skill, index) => (
                        <span key={index} className="badge bg-primary-blue/10 text-primary-blue border-primary-blue/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Contact Information</h3>
                    <button 
                      onClick={handleContactSeller}
                      className="text-sm btn btn-ghost btn-sm"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid gap-3 mt-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-neutral-textGray" />
                      {seller.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-neutral-textGray" />
                      {seller.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-neutral-textGray" />
                      {seller.website}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <div className="p-6">
            <div className="card">
              <div className="border-b">
                <div className="flex -mb-px">
                  <button
                    className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                      activeTab === "services"
                        ? "border-primary-blue text-primary-blue"
                        : "border-transparent text-neutral-textGray hover:text-neutral-darkGray"
                    }`}
                    onClick={() => setActiveTab("services")}
                  >
                    Services ({sellerServices.length})
                  </button>
                  <button
                    className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                      activeTab === "reviews"
                        ? "border-primary-blue text-primary-blue"
                        : "border-transparent text-neutral-textGray hover:text-neutral-darkGray"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews ({seller.reviews})
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "services" && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sellerServices.map((service) => (
                      <div 
                        key={service.id} 
                        className="transition-shadow cursor-pointer card hover:shadow-lg"
                        onClick={() => handleViewService(service.id)}
                      >
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="object-cover w-full h-48 rounded-t-lg"
                        />
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{service.title}</h3>
                            <span className="px-2 py-1 text-xs rounded-full bg-primary-blue/10 text-primary-blue">
                              {service.category}
                            </span>
                          </div>
                          <p className="mb-3 text-sm text-neutral-textGray line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary-blue">₦{service.price.toLocaleString()}</span>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{service.reviews.length}</span>
                              <span className="text-neutral-textGray">reviews</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3 text-sm text-neutral-textGray">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {service.delivery}
                            </span>
                            <button 
                              className="btn btn-sm btn-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewService(service.id);
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {sellerServices.flatMap(service => 
                      service.reviews.map((review) => (
                        <div key={review.id} className="card">
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold">{review.user}</h4>
                                <p className="text-sm text-neutral-textGray">{service.title}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="font-semibold">{review.rating}</span>
                              </div>
                            </div>
                            <p className="mb-3 text-neutral-textGray">{review.text}</p>
                            <div className="text-sm text-neutral-textGray">{review.date}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellersProfile;
