import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Service {
  id: string;
  title: string;
  category: string;
  price: number; // In NGN
  delivery: string;
  rating: number;
  seller: string;
  reviews: number;
  imageUrl: string; // For service-specific images
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate full and half stars for rating
  const fullStars = Math.floor(service.rating);
  const hasHalfStar = service.rating % 1 >= 0.25 && service.rating % 1 < 0.75;
  const emptyStars = 5 - Math.ceil(service.rating);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // Simulate API call to toggle favorite
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsFavorite(!isFavorite);
      
      // Here you would typically make an API call to update favorites
      // await addToFavorites(service.id);
      // or
      // await removeFromFavorites(service.id);
      
    } catch (error) {
      console.error('Error updating favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to favorites page
    window.location.href = '/favorites';
  };

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md group rounded-xl hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={service.imageUrl || 'https://via.placeholder.com/300x200'}
          alt={`${service.title} - ${service.category} service by ${service.seller}`}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full top-3 left-3">
          {service.category}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          disabled={isLoading}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isFavorite 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-white/90 text-gray-600 hover:bg-white'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current rounded-full border-t-transparent animate-spin"></div>
          ) : isFavorite ? (
            <FaHeart className="w-4 h-4" />
          ) : (
            <FaRegHeart className="w-4 h-4" />
          )}
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-20">
          <div className="transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <Link
              to={`/service/${service.id}`}
              className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Quick View
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="flex-1 mr-2 text-lg font-semibold text-gray-900 transition-colors line-clamp-2 hover:text-blue-600">
            <Link to={`/service/${service.id}`}>
              {service.title}
            </Link>
          </h3>
        </div>
        
        <p className="mb-3 text-sm text-gray-600">
          By <span className="font-medium text-gray-800">{service.seller}</span>
        </p>
        
        <div className="flex items-center mb-4">
          <div className="flex text-sm">
            {[...Array(fullStars)].map((_, i) => (
              <span key={i} className="text-yellow-500">★</span>
            ))}
            {hasHalfStar && <span className="text-yellow-500">½</span>}
            {[...Array(emptyStars)].map((_, i) => (
              <span key={i + fullStars + (hasHalfStar ? 1 : 0)} className="text-gray-300">☆</span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">({service.reviews} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-gray-900">₦{service.price.toLocaleString()}</span>
          <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">{service.delivery}</span>
        </div>
        
        <div className="flex gap-2">
          <Link
            to={`/service/${service.id}`}
            className="flex-1 px-4 py-2 font-medium text-center text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            View Details
          </Link>
          
          <button
            onClick={handleFavoriteClick}
            className="px-3 py-2 font-medium text-gray-600 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
            title="Go to favorites"
          >
            <FaHeart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;