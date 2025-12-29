import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../utils/supabase'
import { TrendingUp, DollarSign, Calendar } from 'lucide-react'

interface Earning {
  id: string
  order: string
  amount: number
  date: string
  buyer: string
  status: string
}

const Earnings = () => {
  const { user } = useAuth()
  const [earnings, setEarnings] = useState<Earning[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchEarnings()
  }, [user])

  const fetchEarnings = async () => {
    try {
      setLoading(true)
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          id, amount, created_at, status,
          service:services(title),
          buyer:profiles!orders_buyer_id_fkey(full_name)
        `)
        .eq('seller_id', user?.id) // Remove 'completed' filter to show all financial history, or keep to show purely realized earnings
        .eq('status', 'completed')
        .order('created_at', { ascending: false })

      if (error) throw error

      if (orders) {
        const transformedEarnings = orders.map((item: any) => {
          const serviceData = Array.isArray(item.service) ? item.service[0] : item.service
          const buyerData = Array.isArray(item.buyer) ? item.buyer[0] : item.buyer

          return {
            id: item.id,
            order: serviceData?.title || 'Unknown Service',
            amount: item.amount,
            date: new Date(item.created_at).toLocaleDateString(),
            buyer: buyerData?.full_name || 'Unknown Buyer',
            status: item.status
          }
        })
        setEarnings(transformedEarnings)
      }
    } catch (error) {
      console.error('Error fetching earnings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== 'seller') {
    return <div className="container mx-auto px-4 py-8 text-center">Only sellers can view earnings.</div>
  }

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="section-title mb-8">Your Earnings</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 bg-blue-50 border-blue-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500 rounded-full text-white">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <h3 className="text-2xl font-bold text-gray-900">₦{totalEarnings.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="card p-6 bg-green-50 border-green-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500 rounded-full text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">{earnings.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : earnings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-gray-500">No earnings records found yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Buyer</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {earnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{earning.order}</td>
                    <td className="px-6 py-4 text-gray-600">{earning.buyer}</td>
                    <td className="px-6 py-4 text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {earning.date}
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600 text-right">+₦{earning.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Earnings