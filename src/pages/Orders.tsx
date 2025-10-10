import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface Order {
  id: string
  service: string
  buyer: string
  price: number
  status: string
}

const Orders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setOrders([
        { id: '1', service: 'Traditional Dress Design', buyer: 'Amina Sule', price: 15000, status: 'Pending' },
        { id: '2', service: 'Wedding Attire', buyer: 'Tunde Ade', price: 30000, status: 'Completed' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (!user || user.role !== 'seller') {
    return <div className="container px-4 py-8 mx-auto text-center">Only sellers can view orders.</div>
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="section-title">Your Orders</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order.id} className="p-4 card">
              <h3 className="text-lg font-semibold">{order.service}</h3>
              <p className="text-sm text-gray-600">Buyer: {order.buyer}</p>
              <p className="text-sm">Price: ₦{order.price.toLocaleString()}</p>
              <p className="text-sm">Status: {order.status}</p>
              <Link to={`/OrderSummary${order.id}`} className="mt-4 btn btn-primary">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders