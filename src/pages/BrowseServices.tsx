/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import { supabase } from '../utils/supabase';

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

interface PriceRange {
  min: number;
  max: number;
  label: string;
}

const BrowseServices = () => {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: '',
    minPrice: '',
    maxPrice: '',
    delivery: '',
    rating: '',
    seller: '',
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  // Predefined price ranges for better UX
  const priceRanges: PriceRange[] = [
    { min: 0, max: 10000, label: 'Under ₦10,000' },
    { min: 10000, max: 50000, label: '₦10,000 - ₦50,000' },
    { min: 50000, max: 100000, label: '₦50,000 - ₦100,000' },
    { min: 100000, max: 500000, label: '₦100,000 - ₦500,000' },
    { min: 500000, max: 1000000, label: '₦500,000 - ₦1M' },
    { min: 1000000, max: Infinity, label: 'Over ₦1M' },
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);

      // Fetch services with seller profiles
      const { data: servicesData, error } = await supabase
        .from('services')
        .select(`
          id,
          title,
          description,
          price,
          category,
          images,
          delivery_time,
          seller_id,
          seller:profiles!services_seller_id_fkey(full_name, avatar_url)
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch reviews for each service to calculate ratings
      const servicesWithRatings = await Promise.all(
        (servicesData || []).map(async (service) => {
          const { data: reviews } = await supabase
            .from('reviews')
            .select('rating')
            .eq('service_id', service.id);

          const reviewCount = reviews?.length || 0;
          const avgRating = reviewCount > 0
            ? (reviews || []).reduce((sum, r) => sum + r.rating, 0) / reviewCount
            : 0;

          // Handle seller - could be array or object depending on Supabase query
          const sellerData = Array.isArray(service.seller) ? service.seller[0] : service.seller;

          return {
            id: service.id,
            title: service.title,
            category: service.category || 'General',
            price: service.price,
            delivery: service.delivery_time || '3 days',
            rating: Math.round(avgRating * 10) / 10,
            seller: sellerData?.full_name || 'Unknown Vendor',
            reviews: reviewCount,
            imageUrl: service.images?.[0] || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          };
        })
      );

      setServices(servicesWithRatings);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories and sellers for filter options
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(services.map(service => service.category))];
    return uniqueCategories.sort();
  }, [services]);

  const sellers = useMemo(() => {
    const uniqueSellers = [...new Set(services.map(service => service.seller))];
    return uniqueSellers.sort();
  }, [services]);

  const filteredServices = useMemo(() => {
    const filtered = services.filter((service) => {
      const matchesSearch = searchQuery === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.seller.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !filters.category || service.category === filters.category;
      const matchesSeller = !filters.seller || service.seller === filters.seller;

      // Handle price range filter (predefined ranges)
      let matchesPriceRange = true;
      if (filters.priceRange) {
        const range = priceRanges.find(r => r.label === filters.priceRange);
        if (range) {
          matchesPriceRange = service.price >= range.min && service.price <= range.max;
        }
      }

      // Handle custom price range
      const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      const matchesCustomPrice = service.price >= minPrice && service.price <= maxPrice;

      const matchesDelivery = !filters.delivery || service.delivery === filters.delivery;
      const matchesRating = !filters.rating || service.rating >= parseFloat(filters.rating);

      return matchesSearch && matchesCategory && matchesSeller &&
        matchesPriceRange && matchesCustomPrice && matchesDelivery && matchesRating;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery':
        filtered.sort((a, b) => {
          const aDays = parseInt(a.delivery);
          const bDays = parseInt(b.delivery);
          return aDays - bDays;
        });
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Relevance - keep original order or implement search relevance
        break;
    }

    return filtered;
  }, [services, searchQuery, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      minPrice: '',
      maxPrice: '',
      delivery: '',
      rating: '',
      seller: '',
    });
    setSearchQuery('');
    setSortBy('relevance');
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sidebar */}
          <aside className="sticky w-full p-6 bg-white shadow-sm md:w-80 rounded-xl h-fit top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <span className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Search */}
              <div>
                <h3 className="mb-3 font-medium text-gray-900">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search services, categories, sellers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg
                    className="absolute w-5 h-5 text-gray-400 right-3 top-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="mb-3 font-medium text-gray-900">Category</h3>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Seller */}
              <div>
                <h3 className="mb-3 font-medium text-gray-900">Seller</h3>
                <select
                  value={filters.seller}
                  onChange={(e) => setFilters({ ...filters, seller: e.target.value })}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Sellers</option>
                  {sellers.map(seller => (
                    <option key={seller} value={seller}>{seller}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="mb-3 font-medium text-gray-900">Price Range</h3>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full p-3 mb-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Price Ranges</option>
                  {priceRanges.map(range => (
                    <option key={range.label} value={range.label}>{range.label}</option>
                  ))}
                </select>

                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    placeholder="Min ₦"
                    className="w-1/2 p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    placeholder="Max ₦"
                    className="w-1/2 p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Delivery Time */}
              <div>
                <h3 className="mb-3 font-medium text-gray-900">Delivery Time</h3>
                <select
                  value={filters.delivery}
                  onChange={(e) => setFilters({ ...filters, delivery: e.target.value })}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Delivery Times</option>
                  <option value="1 day">1 Day</option>
                  <option value="2 days">2 Days</option>
                  <option value="3 days">3 Days</option>
                  <option value="4 days">4 Days</option>
                  <option value="5 days">5 Days</option>
                  <option value="6 days">6 Days</option>
                  <option value="7 days">7 Days</option>
                  <option value="10 days">10 Days</option>
                  <option value="14 days">14 Days</option>
                  <option value="30 days">30 Days</option>
                  <option value="60 days">60 Days</option>
                  <option value="180 days">180 Days</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <h3 className="mb-3 font-medium text-gray-900">Minimum Rating</h3>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Ratings</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Service Grid */}
          <main className="flex-1">
            <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Browse Professional Services</h1>
                <p className="mt-1 text-sm text-gray-600">
                  {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} available
                  {activeFilterCount > 0 && ` • ${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'} active`}
                </p>
              </div>

              <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:w-48"
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="delivery">Fastest Delivery</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="p-4 bg-white shadow-sm rounded-xl h-80 animate-pulse">
                    <div className="h-40 mb-4 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 mb-2 bg-gray-200 rounded"></div>
                    <div className="w-2/3 h-3 mb-4 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="p-8 text-center bg-white shadow-sm rounded-xl">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No services found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};


export default BrowseServices;
