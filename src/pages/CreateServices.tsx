/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Upload, 
  
  X, 
   
  Tag, 
  MapPin,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react'

const CreateService = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    price: '',
    deliveryTime: '',
    deliveryType: 'days',
    location: '',
    tags: [] as string[],
    requirements: [''] as string[],
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!user || user.role !== 'seller') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-lightGray">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mb-4 text-gray-600">Only verified sellers can create services.</p>
          <button 
            onClick={() => navigate('/seller-dashboard')}
            className="btn btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const categories = {
    'Fashion & Design': ['Clothing Design', 'Tailoring', 'Fashion Consulting', 'Custom Outfits'],
    'Home Services': ['Plumbing', 'Electrical', 'Painting', 'Cleaning', 'Carpentry'],
    'Events & Catering': ['Catering', 'Event Planning', 'Decoration', 'Photography'],
    'Professional Services': ['Consulting', 'Tutoring', 'Graphic Design', 'Web Development'],
    'Beauty & Wellness': ['Hair Styling', 'Makeup', 'Fitness Training', 'Massage Therapy']
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files).slice(0, 5 - images.length)
    setImages(prev => [...prev, ...newImages])

    // Create preview URLs
    newImages.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title || !formData.category || !formData.price || !formData.deliveryTime) {
      setError('Please fill out all required fields')
      return
    }

    if (images.length === 0) {
      setError('Please upload at least one service image')
      return
    }

    if (formData.tags.length === 0) {
      setError('Please add at least one tag')
      return
    }

    setError('')
    setSubmitting(true)

    // Mock API call with FormData for file uploads
    const submitData = new FormData()
    submitData.append('title', formData.title)
    submitData.append('category', formData.category)
    submitData.append('subcategory', formData.subcategory)
    submitData.append('description', formData.description)
    submitData.append('price', formData.price)
    submitData.append('deliveryTime', `${formData.deliveryTime} ${formData.deliveryType}`)
    submitData.append('location', formData.location)
    submitData.append('tags', JSON.stringify(formData.tags))
    submitData.append('requirements', JSON.stringify(formData.requirements.filter(req => req.trim())))
    
    images.forEach(image => {
      submitData.append('images', image)
    })

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false)
      navigate('/manage-services', { 
        state: { message: 'Service created successfully!' }
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen py-8 bg-neutral-lightGray">
      <div className="max-w-4xl px-4 mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Create New Service</h1>
          <p className="text-gray-600">Showcase your skills and start earning on our platform</p>
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
                Service Images *
              </label>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-24 h-24 border rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
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
                  Upload up to 5 images showcasing your work (Required)
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
                  <Plus className="w-4 h-4 mr-1" />
                  Add Requirement
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/seller-dashboard')}
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
                    Creating Service...
                  </>
                ) : (
                  'Create Service'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default CreateService


