import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../utils/supabase'
import {
    Users,
    Briefcase,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    ArrowRight,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react'

interface DashboardStats {
    totalUsers: number
    totalVendors: number
    totalCustomers: number
    totalServices: number
    pendingServices: number
    totalOrders: number
    pendingOrders: number
    totalRevenue: number
    pendingWithdrawals: number
}

interface RecentActivity {
    id: string
    type: 'user' | 'service' | 'order' | 'withdrawal'
    message: string
    time: string
    status?: 'pending' | 'approved' | 'completed' | 'rejected'
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalVendors: 0,
        totalCustomers: 0,
        totalServices: 0,
        pendingServices: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0,
        pendingWithdrawals: 0
    })
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            // Fetch user counts
            const { count: totalUsers } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })

            const { count: totalVendors } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('role', 'seller')

            const { count: totalCustomers } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('role', 'buyer')

            // Fetch service counts
            const { count: totalServices } = await supabase
                .from('services')
                .select('*', { count: 'exact', head: true })

            const { count: pendingServices } = await supabase
                .from('services')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending')

            // Fetch order counts
            const { count: totalOrders } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true })

            const { count: pendingOrders } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending')

            // Fetch total revenue
            const { data: revenue } = await supabase
                .from('orders')
                .select('amount')
                .eq('status', 'completed')

            const totalRevenue = revenue?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0

            // Fetch pending withdrawals
            const { count: pendingWithdrawals } = await supabase
                .from('withdrawals')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending')

            setStats({
                totalUsers: totalUsers || 0,
                totalVendors: totalVendors || 0,
                totalCustomers: totalCustomers || 0,
                totalServices: totalServices || 0,
                pendingServices: pendingServices || 0,
                totalOrders: totalOrders || 0,
                pendingOrders: pendingOrders || 0,
                totalRevenue,
                pendingWithdrawals: pendingWithdrawals || 0
            })

            // Fetch recent activity (combined from different sources)
            const { data: recentOrders } = await supabase
                .from('orders')
                .select('id, status, created_at, amount')
                .order('created_at', { ascending: false })
                .limit(5)

            const { data: recentUsers } = await supabase
                .from('profiles')
                .select('id, full_name, role, created_at')
                .order('created_at', { ascending: false })
                .limit(3)

            const activities: RecentActivity[] = [
                ...(recentOrders?.map(order => ({
                    id: order.id,
                    type: 'order' as const,
                    message: `New order placed - ₦${order.amount?.toLocaleString()}`,
                    time: new Date(order.created_at).toLocaleString(),
                    status: order.status as 'pending' | 'approved' | 'completed'
                })) || []),
                ...(recentUsers?.map(user => ({
                    id: user.id,
                    type: 'user' as const,
                    message: `${user.full_name || 'New user'} joined as ${user.role === 'seller' ? 'vendor' : 'customer'}`,
                    time: new Date(user.created_at).toLocaleString(),
                    status: 'completed' as const
                })) || [])
            ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8)

            setRecentActivity(activities)
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: Users,
            color: 'blue',
            subtitle: `${stats.totalVendors} vendors, ${stats.totalCustomers} customers`,
            link: '/admin/users'
        },
        {
            title: 'Services',
            value: stats.totalServices,
            icon: Briefcase,
            color: 'green',
            subtitle: `${stats.pendingServices} pending approval`,
            link: '/admin/services',
            badge: stats.pendingServices > 0 ? stats.pendingServices : null
        },
        {
            title: 'Orders',
            value: stats.totalOrders,
            icon: ShoppingCart,
            color: 'purple',
            subtitle: `${stats.pendingOrders} pending`,
            link: '/admin/orders',
            badge: stats.pendingOrders > 0 ? stats.pendingOrders : null
        },
        {
            title: 'Revenue',
            value: `₦${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'amber',
            subtitle: `${stats.pendingWithdrawals} withdrawal requests`,
            link: '/admin/payments',
            badge: stats.pendingWithdrawals > 0 ? stats.pendingWithdrawals : null
        }
    ]

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case 'completed':
            case 'approved':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-500" />
            case 'rejected':
                return <XCircle className="w-4 h-4 text-red-500" />
            default:
                return <AlertCircle className="w-4 h-4 text-gray-400" />
        }
    }

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; icon: string; text: string }> = {
            blue: { bg: 'bg-blue-50', icon: 'text-blue-600', text: 'text-blue-600' },
            green: { bg: 'bg-green-50', icon: 'text-green-600', text: 'text-green-600' },
            purple: { bg: 'bg-purple-50', icon: 'text-purple-600', text: 'text-purple-600' },
            amber: { bg: 'bg-amber-50', icon: 'text-amber-600', text: 'text-amber-600' }
        }
        return colors[color] || colors.blue
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="mt-1 text-gray-500">Welcome back! Here's what's happening with JoyDome.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon
                        const colors = getColorClasses(stat.color)
                        return (
                            <Link
                                key={stat.title}
                                to={stat.link}
                                className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                {stat.badge && (
                                    <span className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                                        {stat.badge}
                                    </span>
                                )}
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-gray-500">{stat.subtitle}</p>
                            </Link>
                        )
                    })}
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                to="/admin/services?filter=pending"
                                className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-yellow-600" />
                                    <span className="text-sm font-medium text-yellow-800">Review Pending Services</span>
                                </div>
                                <span className="px-2 py-1 text-xs font-bold text-yellow-800 bg-yellow-200 rounded-full">
                                    {stats.pendingServices}
                                </span>
                            </Link>

                            <Link
                                to="/admin/payments?filter=pending"
                                className="flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-800">Process Withdrawals</span>
                                </div>
                                <span className="px-2 py-1 text-xs font-bold text-blue-800 bg-blue-200 rounded-full">
                                    {stats.pendingWithdrawals}
                                </span>
                            </Link>

                            <Link
                                to="/admin/users"
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-800">Manage Users</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                            <Link to="/admin/orders" className="text-sm text-blue-600 hover:text-blue-700">
                                View all
                            </Link>
                        </div>

                        {recentActivity.length > 0 ? (
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        {getStatusIcon(activity.status)}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900">{activity.message}</p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center text-gray-500">
                                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No recent activity</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Platform Health */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Active Vendors</p>
                                <p className="text-xl font-bold text-gray-900">{stats.totalVendors}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Active Customers</p>
                                <p className="text-xl font-bold text-gray-900">{stats.totalCustomers}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Briefcase className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Approved Services</p>
                                <p className="text-xl font-bold text-gray-900">{stats.totalServices - stats.pendingServices}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminDashboard
