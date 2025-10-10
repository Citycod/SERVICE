import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'

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
            <Route path="/logout-page" element={<LogoutPage/>} />

            {/* Buyer/User Routes */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/favorites" element={<Favorites />} />

            {/* Seller Routes */}
            <Route path="/seller-dashboard" element={<SellersDashboard />} />
            <Route path="/sellers-profile" element={<SellersProfile />} />
            <Route path="/create-service" element={<CreateService />} />
            <Route path="/manage-services" element={<ManageServices />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/earnings" element={<Earnings />} />

<Route path="/seller/:id" element={<SellersProfile />} />
            {/* Order & Checkout Routes */}
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Communication Routes */}
            <Route path="/messaging" element={<Messaging />} />

            {/* other */}
            <Route path="/order-tracking/:id" element={<OrderTracking />} />
 <Route path="/review/:orderId" element={<ReviewRating />} />
<Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-failed" element={<PaymentFailed />} />
<Route path="/order-management" element={<OrderManagement />} />
<Route path="/edit-service/:id" element={<EditService />} />
<Route path="/withdrawal" element={<Withdrawal />} />
<Route path="/analytics" element={<SellerAnalytics />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-of-service" element={<TermsOfService />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
<Route path="*" element={<NotFound />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App