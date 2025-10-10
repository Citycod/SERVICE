/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  delivery: string;
  seller: { 
    id: string;
    name: string; 
    rating: number; 
    reviews: number; 
    imageUrl: string;
    responseTime: string;
    completedJobs: number;
    memberSince: string;
    bio: string;
    location: string;
    specialties: string[];
  };
  reviews: { 
    id: string; 
    text: string; 
    rating: number; 
    user: string; 
    date: string;
    verified: boolean;
  }[];
  imageUrl: string;
  category: string;
  whatsappNumber: string;
  portfolioImages: string[];
  features: string[];
  requirements: string[];
  tags: string[];
}

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [imageViewerOpen, setImageViewerOpen] = useState(false);

  const allServices: Service[] = [
    {
      id: '1',
      title: 'Professional Plumbing Repair',
      description: 'Expert plumbing repair services for leaks, pipes, and fixtures. Our certified plumbers provide quick and reliable solutions for all your plumbing needs. We use high-quality materials and modern techniques to ensure long-lasting results.\n\nWith over 5 years of experience in residential and commercial plumbing, we handle everything from minor leaks to major pipe replacements. Our team is available 24/7 for emergency services.',
      price: 15000,
      delivery: '1 day',
      seller: { 
        id: 'seller1',
        name: 'Oluwaseun Adeyemi', 
        rating: 4.7, 
        reviews: 50,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        responseTime: 'Within 1 hour',
        completedJobs: 247,
        memberSince: '2020',
        bio: 'Certified plumber with over 8 years of experience in residential and commercial plumbing. Specialized in emergency repairs and pipe installations.',
        location: 'Lagos, Nigeria',
        specialties: ['Emergency Plumbing', 'Pipe Installation', 'Leak Repair', 'Water Heater Installation']
      },
      reviews: [
        { id: '1', text: 'Fixed my leak quickly and professionally. Would definitely hire again!', rating: 5, user: 'John Adebayo', date: '2023-10-15', verified: true },
        { id: '2', text: 'Great service and fair pricing. The plumber was punctual and courteous.', rating: 4.5, user: 'Mary Johnson', date: '2023-09-22', verified: true },
        { id: '3', text: 'Excellent work! They arrived on time and completed the job efficiently.', rating: 5, user: 'David Smith', date: '2023-11-10', verified: true },
        { id: '4', text: 'Good service but a bit expensive. Quality was satisfactory.', rating: 4, user: 'Sarah Wilson', date: '2023-08-05', verified: false },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Plumbing',
      whatsappNumber: '+2348012345678',
      portfolioImages: [
        'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80'
      ],
      features: [
        '24/7 Emergency Service',
        'Free Initial Inspection',
        '6 Months Service Warranty',
        'Certified Professionals',
        'Same Day Service Available'
      ],
      requirements: [
        'Clear access to plumbing area',
        'Water supply should be turned off',
        'Provide details of the issue beforehand'
      ],
      tags: ['Emergency', 'Residential', 'Commercial', 'Leak Repair', 'Pipe Installation']
    },
    {
      id: '2',
      title: 'Borehole Drilling Service',
      description: 'Professional borehole drilling for water supply solutions. We provide end-to-end services from site assessment to drilling and installation of pumping systems. Our team uses modern equipment to ensure efficient and reliable water supply.',
      price: 8088800,
      delivery: '14 days',
      seller: { 
        id: 'seller2',
        name: 'Globalwater Co.', 
        rating: 4.6, 
        reviews: 20,
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        responseTime: 'Within 24 hours',
        completedJobs: 89,
        memberSince: '2018',
        bio: 'Leading borehole drilling company with state-of-the-art equipment and certified geologists. Serving residential, commercial, and industrial clients across Nigeria.',
        location: 'Abuja, Nigeria',
        specialties: ['Borehole Drilling', 'Water Treatment', 'Pump Installation', 'Geological Survey']
      },
      reviews: [
        { id: '1', text: 'Excellent work! They delivered exactly what was promised ahead of schedule.', rating: 4.5, user: 'Peter Okonkwo', date: '2023-11-05', verified: true },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1615529162921-f5d0c07042a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Plumbing',
      whatsappNumber: '+2348012345679',
      portfolioImages: [
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1615529162921-f5d0c07042a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
      ],
      features: [
        'Geological Survey Included',
        'Modern Drilling Equipment',
        'Water Quality Testing',
        'Pump Installation',
        'Maintenance Services'
      ],
      requirements: [
        'Site access for equipment',
        'Necessary permits obtained',
        'Water testing requirements'
      ],
      tags: ['Drilling', 'Water Supply', 'Commercial', 'Industrial']
    },
  ];

  useEffect(() => {
    const foundService = allServices.find((s) => s.id === id);
    setService(foundService || null);
    setLoading(false);
  }, [id]);

  const handleWhatsAppMessage = () => {
    const message = `Hello! I'm interested in your service: ${service?.title}. Please provide more information.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${service?.whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleOrderNow = () => {
    if (!service) return;
    
    navigate('/order-summary', { 
      state: { 
        service: {
          id: service.id,
          title: service.title,
          price: service.price,
          delivery: service.delivery,
          seller: service.seller.name,
          imageUrl: service.imageUrl
        },
        quantity,
        totalPrice: service.price * quantity
      } 
    });
  };

  const handleViewSellerProfile = () => {
    if (service?.seller) {
      navigate(`/seller/${service.seller.id}`, { 
        state: { seller: service.seller }
      });
    }
  };

  const handleMessageSeller = () => {
    if (service?.seller) {
      navigate('/messaging', { 
        state: { 
          recipient: {
            id: service.seller.id,
            name: service.seller.name,
            avatar: service.seller.imageUrl,
            role: 'seller'
          },
          service: {
            id: service.id,
            title: service.title,
            price: service.price,
            image: service.imageUrl
          },
          initialMessage: `Hi ${service.seller.name}, I'm interested in your "${service.title}" service. Can you tell me more about it?`
        } 
      });
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
  
  if (!service) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Service Not Found</h2>
        <p className="mb-6 text-gray-600">The service you're looking for doesn't exist or has been removed.</p>
        <Link to="/services" className="px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
          Browse Services
        </Link>
      </div>
    </div>
  );

  // Filter related services (exclude current service)
  const relatedServices = allServices
    .filter((s) => s.category === service.category && s.id !== id)
    .slice(0, 3);

  const totalRating = service.reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = service.reviews.length > 0 ? totalRating / service.reviews.length : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: service.reviews.filter(r => Math.round(r.rating) === stars).length,
    percentage: (service.reviews.filter(r => Math.round(r.rating) === stars).length / service.reviews.length) * 100
  }));

  const displayedReviews = showAllReviews ? service.reviews : service.reviews.slice(0, 3);

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
            <li><Link to={`/services?category=${service.category}`} className="text-blue-600 hover:underline">{service.category}</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate">{service.title}</li>
          </ol>
        </div>
      </nav>

      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Images and Description */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="mb-6 overflow-hidden bg-white shadow-sm rounded-xl">
              <div className="relative h-80 md:h-96">
                <img
                  src={service.portfolioImages[activeImage] || service.imageUrl}
                  alt={service.title}
                  className="object-cover w-full h-full cursor-zoom-in"
                  onClick={() => setImageViewerOpen(true)}
                />
                <div className="absolute px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full top-4 left-4">
                  {service.category}
                </div>
                <div className="absolute px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-full top-4 right-4">
                  {service.delivery} Delivery
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex p-4 space-x-2 overflow-x-auto">
                {service.portfolioImages.map((img, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${activeImage === index ? 'border-blue-500 scale-105' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={img}
                      alt={`${service.title} view ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-6 bg-white shadow-sm rounded-xl">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {['description', 'features', 'reviews', 'seller'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'description' && (
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Service Description</h2>
                    <div className="leading-relaxed text-gray-700 whitespace-pre-line">
                      {service.description}
                    </div>
                    
                    {/* Tags */}
                    <div className="mt-6">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900">Service Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Service Features</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">What's Included</h3>
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Requirements</h3>
                        <ul className="space-y-2">
                          {service.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                              </svg>
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex flex-col mb-6 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                        <div className="flex items-center mt-2">
                          <div className="flex mr-2 text-2xl text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-lg text-gray-600">({service.reviews.length} reviews)</span>
                        </div>
                      </div>

                      {/* Rating Distribution */}
                      <div className="mt-4 md:mt-0 md:ml-8">
                        {ratingDistribution.map(({ stars, count, percentage }) => (
                          <div key={stars} className="flex items-center text-sm">
                            <span className="w-8 text-gray-600">{stars} ★</span>
                            <div className="w-24 h-2 mx-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-yellow-500 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="w-8 text-gray-500">({count})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {service.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {displayedReviews.map((review) => (
                          <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                            <div className="flex items-start mb-3">
                              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                                <span className="font-semibold text-blue-600">
                                  {review.user.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-900">{review.user}</h4>
                                    <div className="flex items-center mt-1 text-sm text-gray-500">
                                      <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                          <span key={i} className={i < Math.round(review.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                                            ★
                                          </span>
                                        ))}
                                      </div>
                                      <span className="ml-2">{review.date}</span>
                                      {review.verified && (
                                        <span className="flex items-center ml-2 text-green-600">
                                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                          Verified
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <p className="mt-3 text-gray-700">{review.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {service.reviews.length > 3 && (
                          <button
                            onClick={() => setShowAllReviews(!showAllReviews)}
                            className="w-full py-3 font-medium text-center text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
                          >
                            {showAllReviews ? 'Show Less Reviews' : `Show All ${service.reviews.length} Reviews`}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                        <p className="text-gray-600">No reviews yet. Be the first to review this service!</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'seller' && (
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">About the Seller</h2>
                    <div className="flex items-start">
                      <img
                        src={service.seller.imageUrl}
                        alt={service.seller.name}
                        className="object-cover w-20 h-20 mr-6 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">{service.seller.name}</h3>
                        <div className="flex items-center mt-2 mb-4">
                          <div className="flex mr-2 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.round(service.seller.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-gray-600">({service.seller.reviews} reviews)</span>
                        </div>
                        
                        {/* Seller Bio */}
                        <p className="mb-4 text-gray-700">{service.seller.bio}</p>
                        
                        {/* Seller Details */}
                        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{service.seller.rating}</div>
                            <div className="text-sm text-gray-600">Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{service.seller.completedJobs}</div>
                            <div className="text-sm text-gray-600">Jobs Done</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{service.seller.responseTime}</div>
                            <div className="text-sm text-gray-600">Response Time</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{service.seller.memberSince}</div>
                            <div className="text-sm text-gray-600">Member Since</div>
                          </div>
                        </div>

                        {/* Seller Location */}
                        <div className="mt-4">
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            {service.seller.location}
                          </div>
                        </div>

                        {/* Seller Specialties */}
                        <div className="mt-4">
                          <h4 className="mb-2 font-semibold text-gray-900">Specialties</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.seller.specialties.map((specialty, index) => (
                              <span key={index} className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Seller Actions */}
                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={handleViewSellerProfile}
                            className="flex-1 px-4 py-2 font-semibold text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
                          >
                            View Full Profile
                          </button>
                          <button
                            onClick={handleMessageSeller}
                            className="flex-1 px-4 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                          >
                            Message Seller
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Info */}
          <div className="lg:col-span-1">
            {/* Purchase Card */}
            <div className="sticky p-6 bg-white shadow-lg rounded-xl top-6">
              <h1 className="mb-4 text-2xl font-bold text-gray-900">{service.title}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex mr-2 text-lg text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({service.reviews.length} reviews)</span>
              </div>

              <div className="mb-2 text-3xl font-bold text-gray-900">₦{service.price.toLocaleString()}</div>
              
              <div className="flex items-center mb-6 text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Delivery: {service.delivery}</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex items-center max-w-xs">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-l-lg hover:bg-gray-300"
                  >
                    -
                  </button>
                  <div className="flex-1 px-4 py-2 font-medium text-center text-gray-900 bg-gray-100">{quantity}</div>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-r-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between p-4 mb-6 rounded-lg bg-blue-50">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="text-xl font-bold text-blue-600">₦{(service.price * quantity).toLocaleString()}</span>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleOrderNow}
                  className="block w-full px-6 py-4 font-semibold text-center text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
                >
                  Order Now
                </button>
                
                <button 
                  onClick={handleWhatsAppMessage}
                  className="flex items-center justify-center w-full px-6 py-4 font-semibold text-white transition-colors bg-green-600 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893    c0 0-2.16-1.035-2.16-1.035"/>
                  </svg>
                  Chat on WhatsApp
                </button>

                <button 
                  onClick={handleMessageSeller}
                  className="flex items-center justify-center w-full px-6 py-4 font-semibold text-gray-700 transition-colors bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                  Message Seller
                </button>
              </div>

              {/* Service Guarantees */}
              <div className="pt-6 mt-6 border-t border-gray-200">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Service Guarantees</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Quality guaranteed
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Secure payment
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    On-time delivery
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="pt-6 mt-6 border-t border-gray-200">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">About the Seller</h3>
                <div className="flex items-center">
                  <img
                    src={service.seller.imageUrl}
                    alt={service.seller.name}
                    className="object-cover w-12 h-12 mr-4 rounded-full"
                  />
                  <div className="flex-1">
                    <Link 
                      to={`/seller/${service.seller.id}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {service.seller.name}
                    </Link>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="flex mr-1 text-sm text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.round(service.seller.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span>({service.seller.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <Link 
                  to={`/seller/${service.seller.id}`}
                  className="block w-full py-2 mt-4 text-sm font-medium text-center text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  View Seller Profile
                </Link>
              </div>
            </div>

            {/* Share Service */}
            <div className="p-4 mt-6 bg-white shadow-sm rounded-xl">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Share this service</h3>
              <div className="flex space-x-3">
                <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-blue-400 rounded-full hover:bg-blue-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.543l-.047-.02z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-red-500 rounded-full hover:bg-red-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-gray-800 rounded-full hover:bg-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Viewer Modal */}
        {imageViewerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <div className="relative max-w-4xl max-h-full">
              <button 
                onClick={() => setImageViewerOpen(false)}
                className="absolute z-10 p-2 text-white bg-black bg-opacity-50 rounded-full top-4 right-4 hover:bg-opacity-75"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <img
                src={service.portfolioImages[activeImage] || service.imageUrl}
                alt={service.title}
                className="object-contain max-w-full max-h-screen"
              />
              <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
                {service.portfolioImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-3 h-3 rounded-full ${activeImage === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Related Services</h2>
              <Link 
                to={`/services?category=${service.category}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View all in {service.category}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((relatedService) => (
                <div key={relatedService.id} className="overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-xl hover:shadow-md hover:transform hover:scale-105">
                  <div className="relative h-48">
                    <img
                      src={relatedService.imageUrl}
                      alt={relatedService.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded top-3 left-3">
                      {relatedService.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">{relatedService.title}</h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">{relatedService.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">₦{relatedService.price.toLocaleString()}</span>
                      <Link 
                        to={`/service/${relatedService.id}`}
                        className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm">
              <button className="flex items-center justify-between w-full p-4 text-left">
                <span className="font-semibold text-gray-900">How long does the service take?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="p-4 pt-0 text-gray-700">
                The service typically takes {service.delivery} to complete, depending on the complexity and scope of work.
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm">
              <button className="flex items-center justify-between w-full p-4 text-left">
                <span className="font-semibold text-gray-900">What materials are included?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm">
              <button className="flex items-center justify-between w-full p-4 text-left">
                <span className="font-semibold text-gray-900">Do you provide warranty?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;