
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-neutral-lightGray flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-gray-600">404</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, 
          deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full btn btn-primary flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full btn btn-ghost flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>

          <div className="relative mt-6">
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Popular Pages</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/browse-services" className="text-blue-600 hover:text-blue-700 text-sm">
              Browse Services
            </Link>
            <Link to="/categories" className="text-blue-600 hover:text-blue-700 text-sm">
              Categories
            </Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-700 text-sm">
              About Us
            </Link>
            <Link to="/contact" className="text-blue-600 hover:text-blue-700 text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;