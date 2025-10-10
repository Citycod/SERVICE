/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Tag, 
  MapPin,
  AlertCircle,
  Save,
  Trash2
} from 'lucide-react';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock service data - replace with API call
  const [service, setService] = useState({
    id: id || '1',
    title: 'Traditional Wedding Attire Design',
    category: 'Fashion & Design',
    subcategory: 'Clothing Design',
    description: 'Custom-made traditional wedding outfits including Aso Ebi, Agbada, and more. Specializing in intricate embroidery and beadwork with premium fabrics.',
    price: '45000',
    deliveryTime: '14',
    deliveryType: 'days',
    location: 'Lagos, Nigeria',
    tags: ['wedding', 'traditional', 'asoebi', 'agbada', 'custom'],
    requirements: ['Client measurements', 'Preferred color scheme', 'Event date'],
    images: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=500',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500'
    ]
  });

  const [formData, setFormData] = useState(service);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = {
    'Fashion & Design': ['Clothing Design', 'Tailoring', 'Fashion Consulting', 'Custom Outfits'],
    'Home Services': ['Plumbing', 'Electrical', 'Painting', 'Cleaning', 'Carpentry'],
    'Events & Catering': ['Catering', 'Event Planning', 'Decoration', 'Photography'],
    'Professional Services': ['Consulting', 'Tutoring', 'Graphic Design', 'Web Development'],
    'Beauty & Wellness': ['Hair Styling', 'Makeup', 'Fitness Training', 'Massage Therapy']
  };

  useEffect(() => {
    // Simulate API call to fetch service data
    setTimeout(() => {
      setFormData(service);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImageFiles = Array.from(files).slice(0, 5 - (service.images.length + newImages.length));
    setNewImages(prev => [...prev, ...newImageFiles]);

    // Create preview URLs
    newImageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number, isNew: boolean = false) => {
    if (isNew) {
      setNewImages(prev => prev.filter((_, i) => i !== index));
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.category || !formData.price || !formData.deliveryTime) {
      setError('Please fill out all required fields');
      return;
    }

    if (formData.tags.length === 0) {
      setError('Please add at least one tag');
      return;
    }

    setError('');
    setSubmitting(true);

    // Mock API call
    setTimeout(() => {
      console.log('Service updated:', { ...formData, newImages });
      setSubmitting(false);
      navigate('/manage-services', { 
        state: { message: 'Service updated successfully!' }
      });
    }, 2000);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      // Mock delete API call
      setTimeout(() => {
        navigate('/manage-services', { 
          state: { message: 'Service deleted successfully!' }
        });
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-lightGray">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading service data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-neutral-lightGray">
      <div className="max-w-4xl px-4 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Service</h1>
              <p className="text-gray-600">Update your service details and pricing</p>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Service
          </button>
        </div>

        {error && (
          <div className="flex items-center p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <AlertCircle className="w-5 h-5 mr-3 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="card">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Service Images */}
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Service Images
              </label>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {/* Existing Images */}
                  {formData.images.map((image, index) => (
                    <div key={`existing-${index}`} className="relative">
                      <img
                        src={image}
                        alt={`Service ${index + 1}`}
                        className="object-cover w-24 h-24 border rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, false)}
                        className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  {/* New Images */}
                  {imagePreviews.map((preview, index) => (
                    <div key={`new-${index}`} className="relative">
                      <img
                        src={preview}
                        alt={`New preview ${index + 1}`}
                        className="object-cover w-24 h-24 border rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, true)}
                        className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Add Image Button */}
                  {(formData.images.length + newImages.length) < 5 && (
                    <label className="flex flex-col items-center justify-center w-24 h-24 transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400">
                      <Upload className="w-6 h-6 mb-1 text-gray-400" />
                      <span className="text-xs text-gray-500">Add Image</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  You can have up to 5 images. {5 - (formData.images.length + newImages.length)} remaining.
                </p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                  Service Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Professional Wedding Dress Design"
                />
              </div>

              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {Object.keys(categories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {formData.category && categories[formData.category as keyof typeof categories] && (
              <div>
                <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-700">
                  Subcategory
                </label>
                <select
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Subcategory</option>
                  {categories[formData.category as keyof typeof categories].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Description */}
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                Service Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your service in detail. What makes it special? What do clients get?"
              />
            </div>

            {/* Price & Delivery */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
                  Price (₦) *
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5000"
                />
              </div>

              <div>
                <label htmlFor="delivery" className="block mb-2 text-sm font-medium text-gray-700">
                  Delivery Time *
                </label>
                <div className="flex gap-2">
                  <input
                    id="delivery"
                    type="number"
                    min="1"
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                    required
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="7"
                  />
                  <select
                    value={formData.deliveryType}
                    onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">
                <MapPin className="inline w-4 h-4 mr-1" />
                Service Location
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Lagos, Nigeria or Remote"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                <Tag className="inline w-4 h-4 mr-1" />
                Tags *
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add tags to help clients find your service"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-blue-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Client Requirements
              </label>
              <div className="space-y-2">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Client should provide measurements"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="p-3 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  Add Requirement
                </button>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/manage-services')}
                className="flex-1 btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 btn btn-primary"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
                    Updating Service...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Service
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditService;