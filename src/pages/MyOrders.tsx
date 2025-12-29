import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../utils/supabase'
import { Link } from 'react-router-dom'
import { Calendar, Package, User } from 'lucide-react'

interface Order {
  id: string
  service: {
    title: string
  }
  seller: {
    full_name: string
  }
  amount: number
  status: string
  created_at: string
}

const MyOrders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id, amount, status, created_at,
          service:services(title),
          seller:profiles!orders_seller_id_fkey(full_name)
        `)
        .eq('buyer_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      if (data) {
        const transformOrder = (item: any): Order => {
          const serviceData = Array.isArray(item.service) ? item.service[0] : item.service
          const sellerData = Array.isArray(item.seller) ? item.seller[0] : item.seller

          return {
            id: item.id,
            service: { title: serviceData?.title || 'Unknown Service' },
            seller: { full_name: sellerData?.full_name || 'Unknown Seller' },
            amount: item.amount,
            status: item.status,
            created_at: item.created_at
          }
        }
        setOrders(data.map(transformOrder))
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">Please sign in to view your orders.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="section-title mb-6">My Orders</h1>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link to="/browse-services" className="btn btn-primary">Browse Services</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="card p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                    }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500 ml-3 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{order.service.title}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  Seller: {order.seller.full_name}
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-xl font-bold text-primary-blue mb-2">₦{order.amount.toLocaleString()}</p>
                <Link to={`/order-tracking/${order.id}`} className="btn btn-outline btn-sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders