import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../utils/supabase'
import {
    Search,
    MoreVertical,
    Ban,
    CheckCircle,
    XCircle,
    User,
    Building2,
    Shield
} from 'lucide-react'

interface UserProfile {
    id: string
    full_name: string
    username: string
    email?: string
    phone: string
    role: 'buyer' | 'seller' | 'admin'
    avatar_url: string
    is_verified: boolean
    is_banned: boolean
    category?: string
    location?: string
    created_at: string
}

const AdminUsers = () => {
    const [users, setUsers] = useState<UserProfile[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [roleFilter, setRoleFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [roleFilter, statusFilter])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            let query = supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })

            if (roleFilter !== 'all') {
                query = query.eq('role', roleFilter)
            }

            if (statusFilter === 'verified') {
                query = query.eq('is_verified', true)
            } else if (statusFilter === 'unverified') {
                query = query.eq('is_verified', false)
            } else if (statusFilter === 'banned') {
                query = query.eq('is_banned', true)
            }

            const { data, error } = await query

            if (error) throw error
            setUsers(data || [])
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleBanUser = async (userId: string, isBanned: boolean) => {
        try {
            setActionLoading(true)
            const { error } = await supabase
                .from('profiles')
                .update({ is_banned: !isBanned })
                .eq('id', userId)

            if (error) throw error

            setUsers(users.map(u =>
                u.id === userId ? { ...u, is_banned: !isBanned } : u
            ))
            setShowModal(false)
        } catch (error) {
            console.error('Error updating user:', error)
        } finally {
            setActionLoading(false)
        }
    }

    const handleVerifyUser = async (userId: string, isVerified: boolean) => {
        try {
            setActionLoading(true)
            const { error } = await supabase
                .from('profiles')
                .update({ is_verified: !isVerified })
                .eq('id', userId)

            if (error) throw error

            setUsers(users.map(u =>
                u.id === userId ? { ...u, is_verified: !isVerified } : u
            ))
            setShowModal(false)
        } catch (error) {
            console.error('Error updating user:', error)
        } finally {
            setActionLoading(false)
        }
    }

    const filteredUsers = users.filter(user => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
            user.full_name?.toLowerCase().includes(query) ||
            user.username?.toLowerCase().includes(query) ||
            user.phone?.toLowerCase().includes(query) ||
            user.location?.toLowerCase().includes(query)
        )
    })

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'seller':
                return <Building2 className="w-4 h-4 text-green-600" />
            case 'admin':
                return <Shield className="w-4 h-4 text-purple-600" />
            default:
                return <User className="w-4 h-4 text-blue-600" />
        }
    }

    const getRoleBadge = (role: string) => {
        const styles: Record<string, string> = {
            buyer: 'bg-blue-100 text-blue-800',
            seller: 'bg-green-100 text-green-800',
            admin: 'bg-purple-100 text-purple-800'
        }
        const labels: Record<string, string> = {
            buyer: 'Customer',
            seller: 'Vendor',
            admin: 'Admin'
        }
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${styles[role]}`}>
                {getRoleIcon(role)}
                {labels[role]}
            </span>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                        <p className="mt-1 text-gray-500">Manage vendors and customers on the platform</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded">{filteredUsers.length} users</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 p-4 bg-white rounded-xl border border-gray-100 sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, username, phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Role Filter */}
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Roles</option>
                        <option value="buyer">Customers</option>
                        <option value="seller">Vendors</option>
                        <option value="admin">Admins</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="verified">Verified</option>
                        <option value="unverified">Unverified</option>
                        <option value="banned">Banned</option>
                    </select>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">
                            <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No users found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        {user.avatar_url ? (
                                                            <img
                                                                src={user.avatar_url}
                                                                alt={user.full_name}
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                                <User className="w-5 h-5 text-gray-500" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{user.full_name || 'Unnamed'}</p>
                                                        <p className="text-sm text-gray-500">{user.phone || 'No phone'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getRoleBadge(user.role)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    {user.is_banned ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                                            <XCircle className="w-3 h-3" />
                                                            Banned
                                                        </span>
                                                    ) : user.is_verified ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                                            Unverified
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.location || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user)
                                                        setShowModal(true)
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    <MoreVertical className="w-5 h-5 text-gray-400" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* User Detail Modal */}
                {showModal && selectedUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    {selectedUser.avatar_url ? (
                                        <img
                                            src={selectedUser.avatar_url}
                                            alt={selectedUser.full_name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="w-8 h-8 text-gray-500" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{selectedUser.full_name || 'Unnamed User'}</h3>
                                        <p className="text-sm text-gray-500">{selectedUser.phone}</p>
                                        {getRoleBadge(selectedUser.role)}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Username</p>
                                        <p className="font-medium">{selectedUser.username || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Location</p>
                                        <p className="font-medium">{selectedUser.location || '-'}</p>
                                    </div>
                                    {selectedUser.role === 'seller' && (
                                        <div className="col-span-2">
                                            <p className="text-gray-500">Category</p>
                                            <p className="font-medium">{selectedUser.category || '-'}</p>
                                        </div>
                                    )}
                                    <div className="col-span-2">
                                        <p className="text-gray-500">Joined</p>
                                        <p className="font-medium">{new Date(selectedUser.created_at).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                    {!selectedUser.is_verified && selectedUser.role === 'seller' && (
                                        <button
                                            onClick={() => handleVerifyUser(selectedUser.id, selectedUser.is_verified)}
                                            disabled={actionLoading}
                                            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Verify Vendor
                                        </button>
                                    )}

                                    {selectedUser.is_verified && (
                                        <button
                                            onClick={() => handleVerifyUser(selectedUser.id, selectedUser.is_verified)}
                                            disabled={actionLoading}
                                            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Remove Verification
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleBanUser(selectedUser.id, selectedUser.is_banned)}
                                        disabled={actionLoading}
                                        className={`flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-50 ${selectedUser.is_banned
                                            ? 'text-green-700 bg-green-100 hover:bg-green-200'
                                            : 'text-red-700 bg-red-100 hover:bg-red-200'
                                            }`}
                                    >
                                        <Ban className="w-4 h-4" />
                                        {selectedUser.is_banned ? 'Unban User' : 'Ban User'}
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-b-xl">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default AdminUsers
