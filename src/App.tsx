import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Public Pages
import Home from './pages/Home'
import BrowseServices from './pages/BrowseServices'
import SearchResults from './pages/SearchResult'
import ServiceDetails from './pages/ServiceDetails'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'

// Authentication Pages
import SignUp from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

// Buyer/User Pages
import UserDashboard from './pages/UserDashboard'
import Profile from './pages/Profile'
import ProfileSettings from './pages/ProfileSettings'
import MyOrders from './pages/MyOrders'
import Favorites from './pages/Favourites'

// Seller Pages
import SellersDashboard from './pages/SellersDashboard'
import SellersProfile from './pages/SellersProfile'
import CreateService from './pages/CreateServices'
import ManageServices from './pages/ManageServices'
import Orders from './pages/Orders'
import Earnings from './pages/Earnings'

// Order & Checkout Pages
import OrderSummary from './pages/OrderSummary'
import Checkout from './pages/CheckOut'

// Communication
import Messaging from './pages/Messaging'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminServices from './pages/admin/AdminServices'
import AdminOrders from './pages/admin/AdminOrders'
import AdminPayments from './pages/admin/AdminPayments'
import AdminSettings from './pages/admin/AdminSettings'

//other
import OrderTracking from './pages/OrderTracking'
import ReviewRating from './pages/ReviewRating'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFailed'
import OrderManagement from './pages/OrderManagement'
import EditService from './pages/EditService'
import Withdrawal from './pages/Withdraw'
import SellerAnalytics from './pages/SellerAnalytics'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import RefundPolicy from './pages/RefundPolicy'
import NotFound from './pages/NotFound'
import LogoutPage from './pages/LogoutPage'


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Routes - No Header/Footer */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/services" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminServices />
          </ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminOrders />
          </ProtectedRoute>
        } />
        <Route path="/admin/payments" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPayments />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminSettings />
          </ProtectedRoute>
        } />

        {/* Main App Routes with Header/Footer */}
        <Route path="/*" element={
          <div className="min-h-screen text-gray-900 bg-white">
            <Header />
            <main>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/browse-services" element={<BrowseServices />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/service/:id" element={<ServiceDetails />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />

                {/* Authentication Routes */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/logout-page" element={<LogoutPage />} />

                {/* Buyer/Customer Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={['buyer']}>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/profile-settings" element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                } />
                <Route path="/my-orders" element={
                  <ProtectedRoute allowedRoles={['buyer']}>
                    <MyOrders />
                  </ProtectedRoute>
                } />
                <Route path="/favorites" element={
                  <ProtectedRoute allowedRoles={['buyer']}>
                    <Favorites />
                  </ProtectedRoute>
                } />

                {/* Seller/Vendor Routes */}
                <Route path="/seller-dashboard" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <SellersDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/sellers-profile" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <SellersProfile />
                  </ProtectedRoute>
                } />
                <Route path="/create-service" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <CreateService />
                  </ProtectedRoute>
                } />
                <Route path="/manage-services" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <ManageServices />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/earnings" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <Earnings />
                  </ProtectedRoute>
                } />
                <Route path="/seller/:id" element={<SellersProfile />} />

                {/* Order & Checkout Routes */}
                <Route path="/order-summary" element={
                  <ProtectedRoute>
                    <OrderSummary />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />

                {/* Communication Routes */}
                <Route path="/messaging" element={
                  <ProtectedRoute>
                    <Messaging />
                  </ProtectedRoute>
                } />

                {/* Other Protected Routes */}
                <Route path="/order-tracking/:id" element={
                  <ProtectedRoute>
                    <OrderTracking />
                  </ProtectedRoute>
                } />
                <Route path="/review/:orderId" element={
                  <ProtectedRoute>
                    <ReviewRating />
                  </ProtectedRoute>
                } />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-failed" element={<PaymentFailed />} />
                <Route path="/order-management" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <OrderManagement />
                  </ProtectedRoute>
                } />
                <Route path="/edit-service/:id" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <EditService />
                  </ProtectedRoute>
                } />
                <Route path="/withdrawal" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <Withdrawal />
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <SellerAnalytics />
                  </ProtectedRoute>
                } />

                {/* Legal Pages */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App