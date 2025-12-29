import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../utils/supabase'
import {
    Search,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Briefcase,
    DollarSign,
    Calendar
} from 'lucide-react'

interface Service {
    id: string
    title: string
    description: string
    price: number
    category: string
    delivery_time: string
    images: string[]
    status: 'pending' | 'approved' | 'rejected' | 'paused'
    views: number
    created_at: string
    seller_id: string
    seller?: {
        full_name: string
        avatar_url: string
    }
}

const AdminServices = () => {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        fetchServices()
        fetchCategories()
    }, [statusFilter, categoryFilter])

    const fetchCategories = async () => {
        const { data } = await supabase
            .from('categories')
            .select('name')
            .eq('is_active', true)
        setCategories(data?.map(c => c.name) || [])
    }

    const fetchServices = async () => {
        try {
            setLoading(true)
            let query = supabase
                .from('services')
                .select(`
          *,
          seller:profiles!services_seller_id_fkey(full_name, avatar_url)
        `)
                .order('created_at', { ascending: false })

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter)
            }

            if (categoryFilter !== 'all') {
                query = query.eq('category', categoryFilter)
            }

            const { data, error } = await query

            if (error) throw error
            setServices(data || [])
        } catch (error) {
            console.error('Error fetching services:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateStatus = async (serviceId: string, newStatus: 'approved' | 'rejected' | 'paused') => {
        try {
            setActionLoading(true)
            const { error } = await supabase
                .from('services')
                .update({ status: newStatus })
                .eq('id', serviceId)

            if (error) throw error

            setServices(services.map(s =>
                s.id === serviceId ? { ...s, status: newStatus } : s
            ))
            setShowModal(false)
        } catch (error) {
            console.error('Error updating service:', error)
        } finally {
            setActionLoading(false)
        }
    }

    const filteredServices = services.filter(service => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
            service.title?.toLowerCase().includes(query) ||
            service.description?.toLowerCase().includes(query) ||
            service.category?.toLowerCase().includes(query)
        )
    })

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            paused: 'bg-gray-100 text-gray-800'
        }
        const icons: Record<string, React.ReactNode> = {
            pending: <Clock className="w-3 h-3" />,
            approved: <CheckCircle className="w-3 h-3" />,
            rejected: <XCircle className="w-3 h-3" />,
            paused: <Clock className="w-3 h-3" />
        }
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
                {icons[status]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        )
    }

    const pendingCount = services.filter(s => s.status === 'pending').length

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
                        <p className="mt-1 text-gray-500">Review and manage service listings</p>
                    </div>
                    {pendingCount > 0 && (
                        <div className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-lg">
                            {pendingCount} service(s) pending review
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 p-4 bg-white rounded-xl border border-gray-100 sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search services..."
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
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="paused">Paused</option>
                    </select>

                    {/* Category Filter */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Services Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                    </div>
                ) : filteredServices.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
                        <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No services found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredServices.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {/* Service Image */}
                                <div className="relative h-40 bg-gray-100">
                                    {service.images && service.images[0] ? (
                                        <img
                                            src={service.images[0]}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Briefcase className="w-12 h-12 text-gray-300" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        {getStatusBadge(service.status)}
                                    </div>
                                </div>

                                {/* Service Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 line-clamp-1">{service.title}</h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{service.description}</p>

                                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4" />
                                            ₦{service.price?.toLocaleString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {service.delivery_time}
                                        </span>
                                    </div>

                                    {/* Seller Info */}
                                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            {service.seller?.avatar_url ? (
                                                <img src={service.seller.avatar_url} className="w-6 h-6 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-gray-200" />
                                            )}
                                            {service.seller?.full_name || 'Unknown'}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedService(service)
                                                setShowModal(true)
                                            }}
                                            className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Service Detail Modal */}
                {showModal && selectedService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="relative h-48">
                                {selectedService.images && selectedService.images[0] ? (
                                    <img
                                        src={selectedService.images[0]}
                                        alt={selectedService.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <Briefcase className="w-16 h-16 text-gray-400" />
                                    </div>
                                )}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                                >
                                    <XCircle className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{selectedService.title}</h2>
                                        <p className="text-sm text-gray-500">{selectedService.category}</p>
                                    </div>
                                    {getStatusBadge(selectedService.status)}
                                </div>

                                <p className="mt-4 text-gray-600">{selectedService.description}</p>

                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <p className="text-gray-500">Price</p>
                                        <p className="text-lg font-bold text-gray-900">₦{selectedService.price?.toLocaleString()}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <p className="text-gray-500">Delivery Time</p>
                                        <p className="text-lg font-bold text-gray-900">{selectedService.delivery_time}</p>
                                    </div>
                                </div>

                                {/* Seller Info */}
                                <div className="mt-4 p-4 border border-gray-100 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-2">Vendor</p>
                                    <div className="flex items-center gap-3">
                                        {selectedService.seller?.avatar_url ? (
                                            <img src={selectedService.seller.avatar_url} className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                                        )}
                                        <div>
                                            <p className="font-medium">{selectedService.seller?.full_name || 'Unknown Vendor'}</p>
                                            <p className="text-sm text-gray-500">Posted on {new Date(selectedService.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {selectedService.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleUpdateStatus(selectedService.id, 'approved')}
                                                disabled={actionLoading}
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Approve Service
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(selectedService.id, 'rejected')}
                                                disabled={actionLoading}
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Reject Service
                                            </button>
                                        </>
                                    )}

                                    {selectedService.status === 'approved' && (
                                        <button
                                            onClick={() => handleUpdateStatus(selectedService.id, 'paused')}
                                            disabled={actionLoading}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                                        >
                                            <Clock className="w-4 h-4" />
                                            Pause Service
                                        </button>
                                    )}

                                    {(selectedService.status === 'rejected' || selectedService.status === 'paused') && (
                                        <button
                                            onClick={() => handleUpdateStatus(selectedService.id, 'approved')}
                                            disabled={actionLoading}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approve Service
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

export default AdminServices
