import  { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Star, ArrowLeft, Image, Send, CheckCircle } from 'lucide-react';

const ReviewRating = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get order details from location state or mock data
  const order = location.state?.order || {
    id: orderId || '12345',
    service: 'Traditional Wedding Attire Design',
    seller: 'Chiamaka Okoro',
    sellerId: '456',
    completedDate: '2024-01-20'
  };

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Mock image upload - in real app, upload to cloud storage
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      console.log('Review submitted:', { rating, review, images, orderId });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-lightGray">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-white shadow-sm">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="card">
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="mb-2 text-2xl font-bold">Review Submitted!</h2>
                <p className="mb-6 text-gray-600">
                  Thank you for your feedback. Your review helps other buyers make better decisions.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/my-orders')}
                    className="w-full btn btn-primary"
                  >
                    View My Orders
                  </button>
                  <button 
                    onClick={() => navigate('/browse-services')}
                    className="w-full btn btn-ghost"
                  >
                    Browse More Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-lightGray">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="p-6 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Leave a Review</h1>
              <p className="text-gray-600">Order # {order.id}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="card">
            <div className="p-6">
              {/* Order Summary */}
              <div className="p-4 mb-6 rounded-lg bg-gray-50">
                <h3 className="mb-2 font-semibold">Order Summary</h3>
                <p className="text-gray-600">{order.service}</p>
                <p className="text-sm text-gray-500">Seller: {order.seller}</p>
                <p className="text-sm text-gray-500">Completed: {order.completedDate}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    Overall Rating *
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="p-1 transition-transform hover:scale-110"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star
                          className={`w-12 h-12 ${
                            star <= (hoverRating || rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label htmlFor="review" className="block mb-2 text-sm font-medium text-gray-700">
                    Your Review *
                  </label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience with this service. What did you like? Was there anything that could be improved?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {review.length}/500 characters
                  </p>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Add Photos (Optional)
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Review ${index + 1}`}
                            className="object-cover w-20 h-20 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 p-1 text-white translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <label className="flex flex-col items-center justify-center w-20 h-20 transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400">
                        <Image className="w-6 h-6 text-gray-400" />
                        <span className="mt-1 text-xs text-gray-500">Add</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Upload photos of the completed work (max 5 images)
                    </p>
                  </div>
                </div>

                {/* Tips */}
                <div className="p-4 rounded-lg bg-blue-50">
                  <h4 className="mb-2 font-semibold text-blue-900">Review Tips</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Be specific about what you liked or didn't like</li>
                    <li>• Mention communication, timeliness, and quality</li>
                    <li>• Your review helps other buyers make decisions</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
                      Submitting Review...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Review
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewRating;