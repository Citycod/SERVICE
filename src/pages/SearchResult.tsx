import { useState, useEffect } from 'react';
import { useSearchParams,  } from 'react-router-dom';
import ServiceCard from './ServiceCard';

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

interface Filters {
  category: string;
  priceMin: string;
  priceMax: string;
  rating: string;
  delivery: string;
  experience: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || 'website design'; // Default to 'website design' for mock data
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    category: '',
    priceMin: '',
    priceMax: '',
    rating: '',
    delivery: '',
    experience: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8;

  useEffect(() => {
    setTimeout(() => {
      setServices([
        { id: '1', title: 'Plumbing Repair', category: 'Plumbing', price: 15000, delivery: '1 day', rating: 4.7, seller: 'Oluwaseun Adeyemi', reviews: 50, imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '2', title: 'Borehole Drilling', category: 'Plumbing', price: 8088800, delivery: '14 days', rating: 4.6, seller: 'Globalwater Co.', reviews: 20, imageUrl: 'https://images.unsplash.com/photo-1615529162921-f5d0c07042a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '3', title: 'Residential Plumbing', category: 'Plumbing', price: 25000, delivery: '2 days', rating: 4.8, seller: 'Fredrick De Plumber', reviews: 30, imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80' },
        { id: '4', title: 'Real Estate Development', category: 'Real Estate', price: 55000000, delivery: '180 days', rating: 4.5, seller: 'The Building Practice', reviews: 15, imageUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=1167&q=80' },
        { id: '5', title: 'Property Renovation', category: 'Real Estate', price: 2000000, delivery: '30 days', rating: 4.6, seller: 'Cosgrove Investment', reviews: 25, imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '6', title: 'Event Catering', category: 'Catering', price: 30000, delivery: '3 days', rating: 4.8, seller: 'Chioma Okeke', reviews: 40, imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '7', title: 'Fashion Design', category: 'Fashion', price: 15000, delivery: '5 days', rating: 4.9, seller: 'Chiamaka Okoro', reviews: 60, imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80' },
        { id: '8', title: 'Interior Design', category: 'Design', price: 50000, delivery: '10 days', rating: 4.7, seller: 'Gemstone Realty', reviews: 35, imageUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1172&q=80' },
        { id: '9', title: 'Electrical Installation', category: 'Electrical', price: 20000, delivery: '2 days', rating: 4.6, seller: 'OJM Electrical', reviews: 45, imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '10', title: 'Painting Services', category: 'Painting', price: 25000, delivery: '4 days', rating: 4.5, seller: 'Experience Experts', reviews: 20, imageUrl: 'https://images.unsplash.com/photo-1579965342575-16428a7c8881?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '11', title: 'Roofing Services', category: 'Construction', price: 40000, delivery: '7 days', rating: 4.4, seller: 'Rufus Thomas & Co.', reviews: 15, imageUrl: 'https://images.unsplash.com/photo-1598031075263-2c6d8b3a139d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '12', title: 'Tiling Services', category: 'Construction', price: 30000, delivery: '5 days', rating: 4.6, seller: 'PopAndPolystyrene', reviews: 25, imageUrl: 'https://images.unsplash.com/photo-1581092335397-7a251f1b59c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '13', title: 'Borehole Maintenance', category: 'Plumbing', price: 50000, delivery: '3 days', rating: 4.7, seller: 'An-Nur Contractor', reviews: 30, imageUrl: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '14', title: 'Estate Management', category: 'Real Estate', price: 1000000, delivery: '60 days', rating: 4.5, seller: 'Urban Shelter', reviews: 10, imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80' },
        { id: '15', title: 'Landscaping Services', category: 'Gardening', price: 35000, delivery: '6 days', rating: 4.6, seller: 'Green Solutions', reviews: 20, imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1159&q=80' },
        { id: '16', title: 'Security Installation', category: 'Security', price: 45000, delivery: '4 days', rating: 4.7, seller: 'Kinetic Electromech', reviews: 15, imageUrl: 'https://images.unsplash.com/photo-1557223562-6c77f16299b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '17', title: 'HVAC Services', category: 'HVAC', price: 60000, delivery: '8 days', rating: 4.5, seller: 'Bluebridge Services', reviews: 12, imageUrl: 'https://images.unsplash.com/photo-1599677100233-4b22d99e5445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '18', title: 'Carpentry Work', category: 'Carpentry', price: 20000, delivery: '3 days', rating: 4.6, seller: 'Awoye Contractor', reviews: 18, imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1158&q=80' },
        { id: '19', title: 'Cleaning Services', category: 'Cleaning', price: 15000, delivery: '1 day', rating: 4.8, seller: 'Industrial Cleaners', reviews: 25, imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
        { id: '20', title: 'Pest Control', category: 'Pest Control', price: 18000, delivery: '2 days', rating: 4.7, seller: 'Ehitech Global', reviews: 20, imageUrl: 'https://images.unsplash.com/photo-1596474376133-48c7223562-6c8d8b3a139d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredServices = services.filter((service) => {
    const priceMin = filters.priceMin ? parseInt(filters.priceMin) || 0 : 0;
    const priceMax = filters.priceMax ? parseInt(filters.priceMax) || Infinity : Infinity;
    const rating = filters.rating ? parseFloat(filters.rating) || 0 : 0;

    return (
      (!filters.category || service.category.toLowerCase().includes(filters.category.toLowerCase())) &&
      (!filters.priceMin || service.price >= priceMin) &&
      (!filters.priceMax || service.price <= priceMax) &&
      (!filters.rating || service.rating >= rating) &&
      (!filters.delivery || service.delivery === filters.delivery) &&
      (!filters.experience || service.seller.toLowerCase().includes(filters.experience.toLowerCase())) // Case-insensitive experience filter
    );
  });

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const resetFilters = () => {
    setFilters({ category: '', priceMin: '', priceMax: '', rating: '', delivery: '', experience: '' });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="w-full p-6 bg-white shadow-lg rounded-xl lg:w-72">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Filters</h2>
            <div className="space-y-6">
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Categories</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Catering">Catering</option>
                <option value="Fashion">Fashion</option>
                <option value="Design">Design</option>
                <option value="Electrical">Electrical</option>
                <option value="Painting">Painting</option>
                <option value="Construction">Construction</option>
                <option value="Gardening">Gardening</option>
                <option value="Security">Security</option>
                <option value="HVAC">HVAC</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Pest Control">Pest Control</option>
              </select>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                  placeholder="Min (₦)"
                  className="w-1/2 p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                  placeholder="Max (₦)"
                  className="w-1/2 p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5 Stars & Up</option>
                <option value="4">4 Stars & Up</option>
                <option value="3">3 Stars & Up</option>
              </select>
              <select
                value={filters.delivery}
                onChange={(e) => setFilters({ ...filters, delivery: e.target.value })}
                className="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Delivery Times</option>
                <option value="1 day">1 Day</option>
                <option value="2 days">2 Days</option>
                <option value="3 days">3 Days</option>
                <option value="4 days">4 Days</option>
                <option value="5 days">5 Days</option>
                <option value="6 days">6 Days</option>
                <option value="7 days">7 Days</option>
                <option value="14 days">14 Days</option>
                <option value="30 days">30 Days</option>
                <option value="180 days">180 Days</option>
              </select>
              <select
                value={filters.experience}
                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                className="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Experience Levels</option>
                <option value="Oluwaseun">New Seller</option>
                <option value="Globalwater">Intermediate</option>
                <option value="Fredrick">Expert</option>
              </select>
              <button
                onClick={resetFilters}
                className="w-full py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Service Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Search Results for "{query}"</h1>
              <div className="mt-2 text-gray-600">Found {filteredServices.length} Services</div>
            </div>
            {loading ? (
              <div className="text-center text-gray-600">Loading...</div>
            ) : filteredServices.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {currentServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
                <div className="flex items-center justify-center mt-8 space-x-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600">No results found for "{query}".</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;