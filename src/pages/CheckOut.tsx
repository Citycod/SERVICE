import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { useAuth } from '../contexts/AuthContext'

interface OrderItem {
  service: {
    id: string;
    title: string;
    price: number;
    delivery: string;
    seller: string; // This is the seller NAME from OrderSummary
    seller_id?: string; // We need the seller ID for the relationship
    imageUrl: string;
  };
  quantity: number;
  totalPrice: number;
}

const Checkout = () => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [orderData, setOrderData] = useState<OrderItem | null>(null)

  useEffect(() => {
    if (location.state?.order) {
      setOrderData(location.state.order)
      // Pre-fill user data if available
      if (user) {
        setFormData(prev => ({
          ...prev,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || ''
        }))
      }
    } else {
      navigate('/browse-services')
    }
  }, [location.state, navigate, user])

  const handlePayment = async () => {
    if (!orderData || !user) return

    try {
      // 1. In a real app, verify payment with Paystack here
      // const paymentReference = await paystackInstance.transaction.verify(...)

      // 2. Create Order in Supabase
      // First, get the service details to ensure we have the seller_id if missing
      let sellerId = orderData.service.seller_id;

      if (!sellerId) {
        const { data: service } = await supabase
          .from('services')
          .select('seller_id')
          .eq('id', orderData.service.id)
          .single();

        if (service) sellerId = service.seller_id;
      }

      if (!sellerId) throw new Error('Seller not found');

      const { error } = await supabase
        .from('orders')
        .insert({
          buyer_id: user.id,
          seller_id: sellerId,
          service_id: orderData.service.id,
          amount: orderData.totalPrice,
          status: 'pending', // Initial status
          requirements: 'Standard service requirements', // Simplified for MVP
          delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Mock delivery date (+7 days)
        })
        .select()
        .single();

      if (error) throw error;

      // 3. Create Notification for Seller
      await supabase.from('notifications').insert({
        user_id: sellerId,
        title: 'New Order Received',
        message: `You have a new order for ${orderData.service.title}`,
        type: 'order',
        link: `/order-management` // Adjust link as needed
      });

      // 4. Redirect on success
      setSubmitting(false)
      navigate('/my-orders')

    } catch (error) {
      console.error('Order creation failed:', error)
      setSubmitting(false)
      alert('Failed to place order. Please try again.')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    handlePayment()
  }

  if (!orderData) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Order Summary Side */}
        <div className="bg-gray-50 p-6 rounded-xl h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex items-start space-x-4 mb-4">
            <img src={orderData.service.imageUrl} alt={orderData.service.title} className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <h3 className="font-medium">{orderData.service.title}</h3>
              <p className="text-sm text-gray-500">Qty: {orderData.quantity}</p>
            </div>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total to pay</span>
            <span className="text-primary-blue">₦{orderData.totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Form Side */}
        <div>
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
              />
            </div>
            <button type="submit" disabled={submitting} className="btn btn-primary w-full">
              {submitting ? 'Processing Order...' : `Pay ₦${orderData.totalPrice.toLocaleString()}`}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              Payment is simulated for this demo. No actual charge will be made.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout