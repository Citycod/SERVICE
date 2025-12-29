import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../utils/supabase'
import {
    Search,
    ShoppingCart,
    Clock,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Eye,
    DollarSign,
    User,
    Package
} from 'lucide-react'

interface Order {
    id: string
    amount: number
    status: string
    requirements: string
    created_at: string
    completed_at: string
    buyer_id: string
    service_id: string
    seller_id: string
    buyer?: {
        full_name: string
        avatar_url: string
        phone: string
    }
    seller?: {
        full_name: string
    }
    service?: {
        title: string
        price: number
    }
}

const AdminOrders = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    useEffect(() => {
        fetchOrders()
    }, [statusFilter])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            let query = supabase
                .from('orders')
                .select(`
          *,
          buyer:profiles!orders_buyer_id_fkey(full_name, avatar_url, phone),
          seller:profiles!orders_seller_id_fkey(full_name),
          service:services(title, price)
        `)
                .order('created_at', { ascending: false })

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter)
            }

            const { data, error } = await query

            if (error) throw error
            setOrders(data || [])
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        try {
            setActionLoading(true)
            const updateData: Record<string, unknown> = { status: newStatus }

            if (newStatus === 'completed') {
                updateData.completed_at = new Date().toISOString()
            } else if (newStatus === 'cancelled') {
                updateData.cancelled_at = new Date().toISOString()
            }

            const { error } = await supabase
                .from('orders')
                .update(updateData)
                .eq('id', orderId)

            if (error) throw error

            setOrders(orders.map(o =>
                o.id === orderId ? { ...o, status: newStatus, ...updateData } : o
            ))
            setShowModal(false)
        } catch (error) {
            console.error('Error updating order:', error)
        } finally {
            setActionLoading(false)
        }
    }

    const filteredOrders = orders.filter(order => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
            order.id?.toLowerCase().includes(query) ||
            order.buyer?.full_name?.toLowerCase().includes(query) ||
            order.service?.title?.toLowerCase().includes(query)
        )
    })

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            paid: 'bg-blue-100 text-blue-800',
            in_progress: 'bg-purple-100 text-purple-800',
            delivered: 'bg-indigo-100 text-indigo-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            disputed: 'bg-orange-100 text-orange-800'
        }
        const icons: Record<string, React.ReactNode> = {
            pending: <Clock className="w-3 h-3" />,
            paid: <DollarSign className="w-3 h-3" />,
            in_progress: <Package className="w-3 h-3" />,
            delivered: <Package className="w-3 h-3" />,
            completed: <CheckCircle className="w-3 h-3" />,
            cancelled: <XCircle className="w-3 h-3" />,
            disputed: <AlertTriangle className="w-3 h-3" />
        }
        const labels: Record<string, string> = {
            pending: 'Pending',
            paid: 'Paid',
            in_progress: 'In Progress',
            delivered: 'Delivered',
            completed: 'Completed',
            cancelled: 'Cancelled',
            disputed: 'Disputed'
        }
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {icons[status]}
                {labels[status] || status}
            </span>
        )
    }

    const orderStats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        inProgress: orders.filter(o => ['paid', 'in_progress', 'delivered'].includes(o.status)).length,
        completed: orders.filter(o => o.status === 'completed').length,
        disputed: orders.filter(o => o.status === 'disputed').length
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                        <p className="mt-1 text-gray-500">Track and manage all orders on the platform</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {[
                        { label: 'Total', value: orderStats.total, color: 'gray' },
                        { label: 'Pending', value: orderStats.pending, color: 'yellow' },
                        { label: 'In Progress', value: orderStats.inProgress, color: 'blue' },
                        { label: 'Completed', value: orderStats.completed, color: 'green' },
                        { label: 'Disputed', value: orderStats.disputed, color: 'red' }
                    ].map((stat) => (
                        <div key={stat.label} className={`p-4 bg-${stat.color}-50 rounded-xl border border-${stat.color}-100`}>
                            <p className={`text-sm text-${stat.color}-600`}>{stat.label}</p>
                            <p className={`text-2xl font-bold text-${stat.color}-900`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 p-4 bg-white rounded-xl border border-gray-100 sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by order ID, customer, or service..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="in_progress">In Progress</option>
                        <option value="delivered">Delivered</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="disputed">Disputed</option>
                    </select>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">
                            <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No orders found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Order
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Service
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-mono text-gray-600">
                                                    #{order.id.slice(0, 8)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    {order.buyer?.avatar_url ? (
                                                        <img
                                                            src={order.buyer.avatar_url}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <User className="w-4 h-4 text-gray-500" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{order.buyer?.full_name || 'Unknown'}</p>
                                                        <p className="text-xs text-gray-500">{order.buyer?.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-900 line-clamp-1">{order.service?.title || 'Unknown Service'}</p>
                                                <p className="text-xs text-gray-500">by {order.seller?.full_name || 'Unknown'}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    ₦{order.amount?.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(order)
                                                        setShowModal(true)
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    <Eye className="w-5 h-5 text-gray-400" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Order Detail Modal */}
                {showModal && selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                                        <p className="text-sm text-gray-500 font-mono">#{selectedOrder.id.slice(0, 8)}</p>
                                    </div>
                                    {getStatusBadge(selectedOrder.status)}
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Service */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Service</p>
                                    <p className="font-medium text-gray-900">{selectedOrder.service?.title}</p>
                                    <p className="text-lg font-bold text-blue-600 mt-1">₦{selectedOrder.amount?.toLocaleString()}</p>
                                </div>

                                {/* Customer & Vendor */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 border border-gray-100 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-2">Customer</p>
                                        <p className="font-medium">{selectedOrder.buyer?.full_name}</p>
                                        <p className="text-sm text-gray-500">{selectedOrder.buyer?.phone}</p>
                                    </div>
                                    <div className="p-4 border border-gray-100 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-2">Vendor</p>
                                        <p className="font-medium">{selectedOrder.seller?.full_name}</p>
                                    </div>
                                </div>

                                {/* Requirements */}
                                {selectedOrder.requirements && (
                                    <div className="p-4 border border-gray-100 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-2">Requirements</p>
                                        <p className="text-sm text-gray-700">{selectedOrder.requirements}</p>
                                    </div>
                                )}

                                {/* Timeline */}
                                <div className="p-4 border border-gray-100 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-2">Timeline</p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Created</span>
                                            <span>{new Date(selectedOrder.created_at).toLocaleString()}</span>
                                        </div>
                                        {selectedOrder.completed_at && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Completed</span>
                                                <span>{new Date(selectedOrder.completed_at).toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                                    {selectedOrder.status === 'disputed' && (
                                        <>
                                            <button
                                                onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                                                disabled={actionLoading}
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Resolve (Complete)
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                                                disabled={actionLoading}
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Cancel & Refund
                                            </button>
                                        </>
                                    )}

                                    {selectedOrder.status === 'delivered' && (
                                        <button
                                            onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                                            disabled={actionLoading}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Mark as Completed
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default AdminOrders
