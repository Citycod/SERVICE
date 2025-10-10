import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaystackPop from '@paystack/inline-js'

const Checkout = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handlePayment = () => {
    const paystack = new PaystackPop()
    paystack.newTransaction({
      key: 'your-paystack-public-key', // Replace with your Paystack public key
      email: formData.email,
      amount: 15000 * 100, // Amount in kobo (e.g., ₦15,000)
      onSuccess: () => {
        // Mock success
        setSubmitting(false)
        navigate('/my-orders')
      },
      onCancel: () => {
        setSubmitting(false)
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    handlePayment()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title">Checkout</h1>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue"
              aria-label="Full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue"
              aria-label="Email address"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue"
              aria-label="Phone number"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn btn-primary w-full">
            {submitting ? 'Processing...' : 'Pay with Paystack'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout