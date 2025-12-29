import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('buyer' | 'seller' | 'admin')[]
  redirectTo?: string
}

/**
 * ProtectedRoute - Wrapper component for route protection
 * 
 * Usage:
 * <ProtectedRoute allowedRoles={['seller', 'admin']}>
 *   <SellerDashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ 
  children, 
  allowedRoles,
  redirectTo = '/login'
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Show nothing while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    )
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Check role if allowedRoles is specified
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      // User doesn't have required role - redirect to their appropriate dashboard
      const dashboardMap = {
        buyer: '/dashboard',
        seller: '/seller-dashboard',
        admin: '/admin'
      }
      return <Navigate to={dashboardMap[user.role] || '/dashboard'} replace />
    }
  }

  // User is authenticated and has correct role
  return <>{children}</>
}

export default ProtectedRoute
