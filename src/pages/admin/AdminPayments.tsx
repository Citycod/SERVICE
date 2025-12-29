import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../utils/supabase'
import {
    DollarSign,
    CheckCircle,
    XCircle,
    Clock,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    User
} from 'lucide-react'

interface Withdrawal {
    id: string
    seller_id: string
    amount: number
    status: 'pending' | 'approved' | 'rejected' | 'completed'
    bank_name: string
    account_number: string
    account_name: string
    admin_notes: string
    created_at: string
    processed_at: string
    seller?: {
        full_name: string
        avatar_url: string
    }
}

interface Transaction {
    id: string
    amount: number
    status: string
    created_at: string
    buyer?: {
        full_name: string
    }
    service?: {
        title: string
    }
}

const AdminPayments = () => {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'withdrawals' | 'transactions'>('withdrawals')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)
    const [adminNotes, setAdminNotes] = useState('')

    useEffect(() => {
        if (activeTab === 'withdrawals') {
            fetchWithdrawals()
        } else {
            fetchTransactions()
        }
    }, [activeTab, statusFilter])

    const fetchWithdrawals = async () => {
        try {
            setLoading(true)
            let query = supabase
                .from('withdrawals')
                .select(`
          *,
          seller:profiles!withdrawals_seller_id_fkey(full_name, avatar_url)
        `)
                .order('created_at', { ascending: false })

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter)
            }

            const { data, error } = await query
            if (error) throw error
            setWithdrawals(data || [])
        } catch (error) {
            console.error('Error fetching withdrawals:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchTransactions = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('orders')
                .select(`
          id, amount, status, created_at,
          buyer:profiles!orders_buyer_id_fkey(full_name),
          service:services(title)
        `)
                .in('status', ['paid', 'completed'])
                .order('created_at', { ascending: false })

            if (error) throw error

            // Transform data to handle Supabase array returns
            const transformedData: Transaction[] = (data || []).map((item: Record<string, unknown>) => ({
                id: item.id as string,
                amount: item.amount as number,
                status: item.status as string,
                created_at: item.created_at as string,
                buyer: Array.isArray(item.buyer) ? item.buyer[0] : item.buyer,
                service: Array.isArray(item.service) ? item.service[0] : item.service
            }))

            setTransactions(transformedData)
        } catch (error) {
            console.error('Error fetching transactions:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleProcessWithdrawal = async (withdrawalId: string, newStatus: 'approved' | 'rejected' | 'completed') => {
        try {
            setActionLoading(true)
            const { error } = await supabase
                .from('withdrawals')
                .update({
                    status: newStatus,
                    admin_notes: adminNotes,
                    processed_at: new Date().toISOString()
                })
                .eq('id', withdrawalId)

            if (error) throw error

            setWithdrawals(withdrawals.map(w =>
                w.id === withdrawalId ? { ...w, status: newStatus, admin_notes: adminNotes } : w
            ))
            setShowModal(false)
            setAdminNotes('')
        } catch (error) {
            console.error('Error processing withdrawal:', error)
        } finally {
            setActionLoading(false)
        }
    }

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-blue-100 text-blue-800',
            rejected: 'bg-red-100 text-red-800',
            completed: 'bg-green-100 text-green-800'
        }
        const icons: Record<string, React.ReactNode> = {
            pending: <Clock className="w-3 h-3" />,
            approved: <CheckCircle className="w-3 h-3" />,
            rejected: <XCircle className="w-3 h-3" />,
            completed: <CheckCircle className="w-3 h-3" />
        }
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
                {icons[status]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        )
    }

    // Calculate stats
    const totalWithdrawals = withdrawals.reduce((sum, w) => sum + (w.status === 'completed' ? w.amount : 0), 0)
    const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending').length
    const totalTransactions = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payments & Withdrawals</h1>
                    <p className="mt-1 text-gray-500">Manage transactions and withdrawal requests</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <ArrowDownRight className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Revenue</p>
                                <p className="text-xl font-bold text-gray-900">₦{totalTransactions.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <ArrowUpRight className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Withdrawals Paid</p>
                                <p className="text-xl font-bold text-gray-900">₦{totalWithdrawals.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Pending Requests</p>
                                <p className="text-xl font-bold text-gray-900">{pendingWithdrawals}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('withdrawals')}
                        className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'withdrawals'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Withdrawal Requests
                    </button>
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'transactions'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Transaction History
                    </button>
                </div>

                {/* Filters for Withdrawals */}
                {activeTab === 'withdrawals' && (
                    <div className="flex gap-4">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                )}

                {/* Content */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                        </div>
                    ) : activeTab === 'withdrawals' ? (
                        // Withdrawals Table
                        withdrawals.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No withdrawal requests</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {withdrawals.map((withdrawal) => (
                                            <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        {withdrawal.seller?.avatar_url ? (
                                                            <img src={withdrawal.seller.avatar_url} className="w-8 h-8 rounded-full object-cover" />
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                                <User className="w-4 h-4 text-gray-500" />
                                                            </div>
                                                        )}
                                                        <span className="text-sm font-medium">{withdrawal.seller?.full_name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        ₦{withdrawal.amount?.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm">
                                                        <p className="font-medium">{withdrawal.bank_name}</p>
                                                        <p className="text-gray-500">{withdrawal.account_number}</p>
                                                        <p className="text-gray-500">{withdrawal.account_name}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(withdrawal.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(withdrawal.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    {withdrawal.status === 'pending' && (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedWithdrawal(withdrawal)
                                                                setShowModal(true)
                                                            }}
                                                            className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                                                        >
                                                            Process
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        // Transactions Table
                        transactions.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No transactions yet</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {transactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                                    #{tx.id.slice(0, 8)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {tx.buyer?.full_name || 'Unknown'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 line-clamp-1">
                                                    {tx.service?.title || 'Unknown Service'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                                    +₦{tx.amount?.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(tx.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(tx.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}
                </div>

                {/* Process Withdrawal Modal */}
                {showModal && selectedWithdrawal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900">Process Withdrawal</h3>
                                <p className="text-sm text-gray-500">Review and process this withdrawal request</p>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3 mb-3">
                                        {selectedWithdrawal.seller?.avatar_url ? (
                                            <img src={selectedWithdrawal.seller.avatar_url} className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <User className="w-5 h-5 text-gray-500" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium">{selectedWithdrawal.seller?.full_name}</p>
                                            <p className="text-2xl font-bold text-gray-900">₦{selectedWithdrawal.amount?.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="text-sm space-y-1">
                                        <p><span className="text-gray-500">Bank:</span> {selectedWithdrawal.bank_name}</p>
                                        <p><span className="text-gray-500">Account:</span> {selectedWithdrawal.account_number}</p>
                                        <p><span className="text-gray-500">Name:</span> {selectedWithdrawal.account_name}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                                    <textarea
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Optional notes..."
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={3}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleProcessWithdrawal(selectedWithdrawal.id, 'completed')}
                                        disabled={actionLoading}
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Approve & Mark as Paid
                                    </button>
                                    <button
                                        onClick={() => handleProcessWithdrawal(selectedWithdrawal.id, 'rejected')}
                                        disabled={actionLoading}
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 disabled:opacity-50"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowModal(false)
                                            setAdminNotes('')
                                        }}
                                        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
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

export default AdminPayments
