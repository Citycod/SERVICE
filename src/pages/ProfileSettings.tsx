import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface CustomerPreferences {
  serviceCategories: string[]
  budgetRange: [number, number]
  timeline: 'flexible' | 'urgent' | 'specific-date'
  notificationPreferences: {
    email: boolean
    sms: boolean
    promotions: boolean
  }
}

const ProfileSettings = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    location: '',
    phone: '',
  })
  const [preferences, setPreferences] = useState<CustomerPreferences>({
    serviceCategories: [],
    budgetRange: [50, 500],
    timeline: 'flexible',
    notificationPreferences: {
      email: true,
      sms: false,
      promotions: true,
    }
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // In a real app, this would fetch saved preferences
    const savedPreferences = localStorage.getItem('customerPreferences')
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Mock API call - save both profile and preferences
    setTimeout(() => {
      localStorage.setItem('customerPreferences', JSON.stringify(preferences))
      setSubmitting(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = preferences.serviceCategories.includes(category)
      ? preferences.serviceCategories.filter(c => c !== category)
      : [...preferences.serviceCategories, category]
    
    setPreferences({
      ...preferences,
      serviceCategories: updatedCategories
    })
  }

  const handleBudgetChange = (index: number, value: number) => {
    const newRange = [...preferences.budgetRange] as [number, number]
    newRange[index] = value
    if (newRange[0] > newRange[1]) {
      // Ensure min doesn't exceed max
      if (index === 0) newRange[1] = value
      else newRange[0] = value
    }
    setPreferences({
      ...preferences,
      budgetRange: newRange
    })
  }

  if (!user) {
    return <div className="container px-4 py-8 mx-auto text-center">Please sign in to access your settings.</div>
  }

  const serviceCategories = [
    'Web Development', 'Graphic Design', 'Content Writing', 
    'Digital Marketing', 'Video Editing', 'SEO', 'Voice Over'
  ]

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Profile Settings</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Basic Information Card */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Basic Information</h2>
          {success && (
            <div className="p-3 mb-4 text-green-700 bg-green-100 rounded-lg">
              Profile updated successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                aria-label="Full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                aria-label="Email address"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                aria-label="Phone number"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block mb-1 text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                aria-label="Location"
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block mb-1 text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                rows={3}
                aria-label="Bio"
                placeholder="Tell sellers a bit about yourself and your business"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={submitting} 
              className="w-full px-4 py-3 text-white transition-colors bg-primary-blue rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {submitting ? 'Saving Changes...' : 'Save Profile Information'}
            </button>
          </form>
        </div>

        {/* Preferences Card */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Service Preferences</h2>
          <p className="mb-6 text-sm text-gray-500">
            Customize your marketplace experience based on your preferences
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-medium text-gray-700 text-md">Preferred Service Categories</h3>
              <div className="flex flex-wrap gap-2">
                {serviceCategories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-2 rounded-full text-sm ${
                      preferences.serviceCategories.includes(category)
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-3 font-medium text-gray-700 text-md">Budget Range (per project)</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label htmlFor="minBudget" className="block mb-1 text-xs text-gray-500">
                    Minimum ($)
                  </label>
                  <input
                    id="minBudget"
                    type="number"
                    value={preferences.budgetRange[0]}
                    onChange={(e) => handleBudgetChange(0, parseInt(e.target.value) || 0)}
                    min="5"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <span className="mt-5 text-gray-400">-</span>
                <div className="flex-1">
                  <label htmlFor="maxBudget" className="block mb-1 text-xs text-gray-500">
                    Maximum ($)
                  </label>
                  <input
                    id="maxBudget"
                    type="number"
                    value={preferences.budgetRange[1]}
                    onChange={(e) => handleBudgetChange(1, parseInt(e.target.value) || 0)}
                    min="10"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="mb-3 font-medium text-gray-700 text-md">Preferred Timeline</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {(['flexible', 'urgent', 'specific-date'] as const).map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPreferences({...preferences, timeline: option})}
                    className={`p-3 rounded-xl border text-sm ${
                      preferences.timeline === option
                        ? 'border-primary-blue bg-blue-50 text-primary-blue'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option === 'flexible' && 'Flexible'}
                    {option === 'urgent' && 'Urgent (ASAP)'}
                    {option === 'specific-date' && 'Specific Date'}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-3 font-medium text-gray-700 text-md">Notification Preferences</h3>
              <div className="space-y-3">
                {Object.entries(preferences.notificationPreferences).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`notify-${key}`}
                      checked={value}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        notificationPreferences: {
                          ...preferences.notificationPreferences,
                          [key]: e.target.checked
                        }
                      })}
                      className="w-4 h-4 border-gray-300 rounded text-primary-blue focus:ring-primary-blue"
                    />
                    <label htmlFor={`notify-${key}`} className="ml-2 text-sm text-gray-700 capitalize">
                      {key} notifications
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings