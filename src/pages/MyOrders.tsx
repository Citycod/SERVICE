import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface Order {
  id: string
  service: string
  seller: string
  price: number
  status: string
}

const MyOrders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setOrders([
        { id: '1', service: 'Traditional Dress Design', seller: 'Chiamaka Okoro', price: 15000, status: 'Pending' },
        { id: '2', service: 'Event Catering', seller: 'Chioma Okeke', price: 30000, status: 'Completed' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">Please sign in to view your orders.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title">My Orders</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="card p-4">
              <h3 className="font-semibold text-lg">{order.service}</h3>
              <p className="text-sm text-gray-600">Seller: {order.seller}</p>
              <p className="text-sm">Price: ₦{order.price.toLocaleString()}</p>
              <p className="text-sm">Status: {order.status}</p>
              <Link to={`/order-summary/${order.id}`} className="btn btn-primary mt-4">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders