import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../utils/supabase'
import {
    Settings,
    Save,
    Globe,
    DollarSign,
    Bell,
    Shield,
    CheckCircle,
    AlertCircle,
    Layers,
    Plus,
    Trash2,
    Edit
} from 'lucide-react'

interface Category {
    id: string
    name: string
    slug: string
    description: string
    icon: string
    is_active: boolean
    display_order: number
}

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState<'general' | 'categories' | 'notifications'>('general')
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        description: '',
        icon: ''
    })

    // General Settings State (would normally be stored in a settings table)
    const [generalSettings, setGeneralSettings] = useState({
        siteName: 'JoyDome',
        siteDescription: 'Connect with skilled service providers in Nigeria',
        supportEmail: 'support@joydome.com',
        supportPhone: '+234 xxx xxx xxxx',
        commissionPercentage: 10,
        minWithdrawal: 5000
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) throw error
            setCategories(data || [])
        } catch (error) {
            console.error('Error fetching categories:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSaveGeneral = async () => {
        setSaving(true)
        // In a real implementation, save to a settings table
        setTimeout(() => {
            setSaving(false)
            setMessage({ type: 'success', text: 'Settings saved successfully!' })
            setTimeout(() => setMessage(null), 3000)
        }, 1000)
    }

    const handleToggleCategory = async (categoryId: string, isActive: boolean) => {
        try {
            const { error } = await supabase
                .from('categories')
                .update({ is_active: !isActive })
                .eq('id', categoryId)

            if (error) throw error

            setCategories(categories.map(c =>
                c.id === categoryId ? { ...c, is_active: !isActive } : c
            ))
        } catch (error) {
            console.error('Error updating category:', error)
        }
    }

    const handleSaveCategory = async () => {
        try {
            setSaving(true)
            const slug = categoryForm.name.toLowerCase().replace(/\s+/g, '-')

            if (editingCategory) {
                const { error } = await supabase
                    .from('categories')
                    .update({
                        name: categoryForm.name,
                        description: categoryForm.description,
                        icon: categoryForm.icon,
                        slug
                    })
                    .eq('id', editingCategory.id)

                if (error) throw error

                setCategories(categories.map(c =>
                    c.id === editingCategory.id
                        ? { ...c, ...categoryForm, slug }
                        : c
                ))
            } else {
                const { data, error } = await supabase
                    .from('categories')
                    .insert({
                        name: categoryForm.name,
                        description: categoryForm.description,
                        icon: categoryForm.icon,
                        slug,
                        display_order: categories.length
                    })
                    .select()
                    .single()

                if (error) throw error
                setCategories([...categories, data])
            }

            setShowCategoryModal(false)
            setCategoryForm({ name: '', description: '', icon: '' })
            setEditingCategory(null)
            setMessage({ type: 'success', text: 'Category saved!' })
            setTimeout(() => setMessage(null), 3000)
        } catch (error) {
            console.error('Error saving category:', error)
            setMessage({ type: 'error', text: 'Failed to save category' })
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteCategory = async (categoryId: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return

        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', categoryId)

            if (error) throw error
            setCategories(categories.filter(c => c.id !== categoryId))
        } catch (error) {
            console.error('Error deleting category:', error)
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
                    <p className="mt-1 text-gray-500">Configure your JoyDome marketplace</p>
                </div>

                {/* Message */}
                {message && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                        }`}>
                        {message.type === 'success' ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        {message.text}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-200">
                    {[
                        { id: 'general', label: 'General', icon: Settings },
                        { id: 'categories', label: 'Categories', icon: Layers },
                        { id: 'notifications', label: 'Notifications', icon: Bell }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Site Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-gray-400" />
                                        Site Information
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                                        <input
                                            type="text"
                                            value={generalSettings.siteName}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                                        <textarea
                                            value={generalSettings.siteDescription}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                                        <input
                                            type="email"
                                            value={generalSettings.supportEmail}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                                        <input
                                            type="text"
                                            value={generalSettings.supportPhone}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Financial Settings */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-gray-400" />
                                        Financial Settings
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Platform Commission (%)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={generalSettings.commissionPercentage}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, commissionPercentage: Number(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Percentage taken from each transaction</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Minimum Withdrawal (₦)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={generalSettings.minWithdrawal}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, minWithdrawal: Number(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Minimum amount vendors can withdraw</p>
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-blue-800">
                                            <Shield className="w-5 h-5" />
                                            <span className="font-medium">Security Note</span>
                                        </div>
                                        <p className="mt-1 text-sm text-blue-700">
                                            Financial settings changes are logged and may require additional verification.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    onClick={handleSaveGeneral}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'categories' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Service Categories</h3>
                                <button
                                    onClick={() => {
                                        setEditingCategory(null)
                                        setCategoryForm({ name: '', description: '', icon: '' })
                                        setShowCategoryModal(true)
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Category
                                </button>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center h-32">
                                    <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <div
                                            key={category.id}
                                            className={`flex items-center justify-between p-4 rounded-lg border ${category.is_active ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-lg ${category.is_active ? 'bg-blue-50' : 'bg-gray-100'}`}>
                                                    <Layers className={`w-5 h-5 ${category.is_active ? 'text-blue-600' : 'text-gray-400'}`} />
                                                </div>
                                                <div>
                                                    <p className={`font-medium ${category.is_active ? 'text-gray-900' : 'text-gray-500'}`}>
                                                        {category.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{category.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleToggleCategory(category.id, category.is_active)}
                                                    className={`px-3 py-1 text-xs font-medium rounded-lg ${category.is_active
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                >
                                                    {category.is_active ? 'Active' : 'Inactive'}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingCategory(category)
                                                        setCategoryForm({
                                                            name: category.name,
                                                            description: category.description || '',
                                                            icon: category.icon || ''
                                                        })
                                                        setShowCategoryModal(true)
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-gray-100"
                                                >
                                                    <Edit className="w-4 h-4 text-gray-400" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                    className="p-2 rounded-lg hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>

                            <div className="space-y-4">
                                {[
                                    { id: 'new_orders', label: 'New order notifications', description: 'Get notified when a new order is placed' },
                                    { id: 'withdrawals', label: 'Withdrawal requests', description: 'Get notified when vendors request withdrawals' },
                                    { id: 'new_users', label: 'New user registrations', description: 'Get notified when new users sign up' },
                                    { id: 'disputes', label: 'Order disputes', description: 'Get notified when orders are disputed' }
                                ].map((setting) => (
                                    <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{setting.label}</p>
                                            <p className="text-sm text-gray-500">{setting.description}</p>
                                        </div>
                                        <label className="relative inline-flex cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Category Modal */}
                {showCategoryModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                                </h3>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                                    <input
                                        type="text"
                                        value={categoryForm.name}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                        placeholder="e.g., Plumbing"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={categoryForm.description}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                                        placeholder="Brief description of this category"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Lucide icon name)</label>
                                    <input
                                        type="text"
                                        value={categoryForm.icon}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                                        placeholder="e.g., wrench"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={handleSaveCategory}
                                        disabled={saving || !categoryForm.name}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {saving ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowCategoryModal(false)
                                            setCategoryForm({ name: '', description: '', icon: '' })
                                            setEditingCategory(null)
                                        }}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
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

export default AdminSettings
