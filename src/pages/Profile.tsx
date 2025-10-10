/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiStar, FiClock, FiDollarSign, FiCheck, FiMessageCircle, FiMapPin, FiShield } from 'react-icons/fi'

interface Profile {
  id: string
  name: string
  role: string
  location: string
  bio: string
  rating: number
  reviews: number
  memberSince: string
  preferences: {
    categories: string[]
    budgetRange: string
    responseTime: string
  }
  savedServices: number
  completedOrders: number
  isPremium: boolean
}

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('services')

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setProfile({
        id: id!,
        name: 'Chiamaka Okoro',
        role: 'Premium Customer',
        location: 'Lagos, Nigeria',
        bio: 'Fashion enthusiast with a passion for traditional Nigerian attire. I love supporting local artisans and discovering unique talent.',
        rating: 4.9,
        reviews: 42,
        memberSince: 'January 2023',
        preferences: {
          categories: ['Fashion', 'Design', 'Photography'],
          budgetRange: '₦15,000 - ₦50,000',
          responseTime: 'Within 24 hours'
        },
        savedServices: 18,
        completedOrders: 27,
        isPremium: true
      })
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
  )
  
  if (!profile) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Profile not found</h1>
        <p className="mb-4 text-gray-600">The profile you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-600 hover:underline">Return to homepage</Link>
      </div>
    </div>
  )

  // Mock services data that this customer might be interested in
  const recommendedServices = [
    { id: '1', title: 'Traditional Dress Design', price: 15000, category: 'Fashion', rating: 4.8 },
    { id: '2', title: 'Professional Product Photography', price: 25000, category: 'Photography', rating: 4.9 },
    { id: '3', title: 'Custom Logo Design', price: 12000, category: 'Design', rating: 4.7 },
  ]

  // Mock order history
  const orderHistory = [
    { id: '1', service: 'Traditional Dress Design', seller: 'Ngozi Designs', status: 'Completed', date: 'Sep 5, 2023', price: 15000 },
    { id: '2', service: 'Website Redesign', seller: 'Tech Solutions NG', status: 'Completed', date: 'Aug 22, 2023', price: 45000 },
    { id: '3', service: 'Professional Headshots', seller: 'Lagos Photography', status: 'Completed', date: 'Jul 15, 2023', price: 20000 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm">
        <div className="container px-4 py-4 mx-auto"> */}
          {/* <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-blue-600">JoyDome</Link>
            <div className="flex items-center space-x-4">
              <Link to="/messaging" className="p-2 text-gray-600 hover:text-blue-600">
                <FiMessageCircle className="text-xl" />
              </Link>
              <Link to="/dashboard" className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                My Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container px-4 py-8 mx-auto">
        {/* Profile Header */}
        <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <div className="flex flex-col items-start md:flex-row md:items-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
              alt={profile.name}
              className="object-cover w-24 h-24 mb-4 rounded-full ring-4 ring-blue-100 md:mb-0 md:mr-6"
            />
            <div className="flex-1">
              <div className="flex flex-col justify-between md:flex-row md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
                  <div className="flex items-center mt-1">
                    <p className="mr-3 text-gray-600">{profile.role}</p>
                    {profile.isPremium && (
                      <span className="flex items-center px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                        <FiShield className="mr-1" /> Premium
                      </span>
                    )}
                  </div>
                </div>
                <Link 
                  to="/messaging" 
                  className="flex items-center justify-center px-4 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg md:mt-0 hover:bg-blue-700"
                >
                  <FiMessageCircle className="mr-2" /> Message
                </Link>
              </div>
              
              <div className="flex items-center mt-4 text-gray-600">
                <FiMapPin className="mr-1" /> {profile.location}
                <span className="mx-3">•</span>
                <div className="flex items-center">
                  <FiStar className="mr-1 text-yellow-400" /> {profile.rating}
                  <span className="ml-1 text-gray-500">({profile.reviews} reviews)</span>
                </div>
                <span className="mx-3">•</span>
                <span>Member since {profile.memberSince}</span>
              </div>
              
              <p className="mt-4 text-gray-700">{profile.bio}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          <div className="p-4 text-center bg-white shadow-sm rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{profile.completedOrders}</div>
            <div className="text-gray-600">Completed Orders</div>
          </div>
          <div className="p-4 text-center bg-white shadow-sm rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{profile.savedServices}</div>
            <div className="text-gray-600">Saved Services</div>
          </div>
          <div className="p-4 text-center bg-white shadow-sm rounded-xl">
            <div className="text-2xl font-bold text-blue-600">₦127,500</div>
            <div className="text-gray-600">Total Spent</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Preferences */}
          <div className="lg:col-span-1">
            <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Preferences</h2>
              
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-gray-600">Favorite Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.preferences.categories.map((category, index) => (
                    <span key={index} className="px-3 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-gray-600">Typical Budget Range</h3>
                <div className="flex items-center text-gray-800">
                  <FiDollarSign className="mr-2" /> {profile.preferences.budgetRange}
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-600">Expected Response Time</h3>
                <div className="flex items-center text-gray-800">
                  <FiClock className="mr-2" /> {profile.preferences.responseTime}
                </div>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="p-6 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Verification</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-green-100 rounded-full">
                    <FiCheck className="text-green-600" />
                  </div>
                  <span>Email Verified</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-green-100 rounded-full">
                    <FiCheck className="text-green-600" />
                  </div>
                  <span>Phone Verified</span>
                </div>
                {profile.isPremium && (
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-amber-100">
                      <FiShield className="text-amber-600" />
                    </div>
                    <span>Premium Member</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Content Tabs */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white shadow-sm rounded-xl">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'services'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Recommended Services
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'orders'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Order History
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Reviews
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'services' && (
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-gray-800">Services You Might Like</h3>
                    <div className="space-y-4">
                      {recommendedServices.map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-4 transition-colors border border-gray-200 rounded-lg hover:border-blue-300">
                          <div>
                            <h4 className="font-semibold text-gray-800">{service.title}</h4>
                            <div className="flex items-center mt-1 text-sm text-gray-600">
                              <span className="px-2 py-1 mr-2 text-xs text-blue-800 bg-blue-100 rounded-full">
                                {service.category}
                              </span>
                              <div className="flex items-center">
                                <FiStar className="mr-1 text-yellow-400" /> {service.rating}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">₦{service.price.toLocaleString()}</p>
                            <Link 
                              to={`/service/${service.id}`}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Link 
                        to="/services"
                        className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
                      >
                        Browse All Services <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-gray-800">Recent Orders</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-sm text-left text-gray-500">
                            <th className="pb-3 font-medium">Service</th>
                            <th className="pb-3 font-medium">Seller</th>
                            <th className="pb-3 font-medium">Date</th>
                            <th className="pb-3 font-medium">Price</th>
                            <th className="pb-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {orderHistory.map((order) => (
                            <tr key={order.id}>
                              <td className="py-3 text-sm font-medium text-gray-800">{order.service}</td>
                              <td className="py-3 text-sm text-gray-600">{order.seller}</td>
                              <td className="py-3 text-sm text-gray-600">{order.date}</td>
                              <td className="py-3 text-sm font-medium text-gray-800">₦{order.price.toLocaleString()}</td>
                              <td className="py-3">
                                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-gray-800">Customer Reviews</h3>
                    <div className="py-10 text-center text-gray-500">
                      <FiStar className="mx-auto mb-2 text-3xl text-yellow-400" />
                      <p>No reviews yet</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile