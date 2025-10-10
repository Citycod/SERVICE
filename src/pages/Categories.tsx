import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { 
      id: 1, 
      name: 'Fashion', 
      sub: 'Traditional, Modern', 
      icon: 'fas fa-tshirt',
      color: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    { 
      id: 2, 
      name: 'Catering', 
      sub: 'Events, Food', 
      icon: 'fas fa-utensils',
      color: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    { 
      id: 3, 
      name: 'Plumbing', 
      sub: 'Repairs, Installations', 
      icon: 'fas fa-wrench',
      color: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      id: 4, 
      name: 'Carpentry', 
      sub: 'Furniture, Woodwork', 
      icon: 'fas fa-hammer',
      color: 'bg-amber-50',
      textColor: 'text-amber-700'
    },
    { 
      id: 5, 
      name: 'Electrical', 
      sub: 'Wiring, Repairs', 
      icon: 'fas fa-bolt',
      color: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    { 
      id: 6, 
      name: 'Event Planning', 
      sub: 'Weddings, Corporate', 
      icon: 'fas fa-calendar-alt',
      color: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ];

  // Simulate loading for a better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Categories</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="p-5 overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
                <div className="animate-pulse">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gray-300 rounded-full"></div>
                  <div className="w-3/4 h-4 mx-auto mb-2 bg-gray-300 rounded"></div>
                  <div className="w-1/2 h-3 mx-auto bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">Service Categories</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Browse through our wide range of service categories to find the perfect professional for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/browse-services?category=${encodeURIComponent(category.name)}`}
              className="block group"
              aria-label={`Browse ${category.name} services`}
            >
              <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-xl hover:-translate-y-2">
                <div className={`p-6 text-center ${category.color} group-hover:bg-opacity-80 transition-colors duration-300`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.color} mb-5`}>
                    <i className={`${category.icon} text-2xl ${category.textColor}`}></i>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.sub}</p>
                  <div className="mt-4 text-xs font-medium text-blue-500 transition-opacity opacity-0 group-hover:opacity-100">
                    Explore services →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">Can't find what you're looking for?</p>
          <button className="px-6 py-3 font-medium text-gray-800 transition-colors bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;