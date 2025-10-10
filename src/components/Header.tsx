/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FaBars, FaTimes, FaChevronDown, FaYoutube } from 'react-icons/fa'

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [isCheckingLive, setIsCheckingLive] = useState(true)
  const { user } = useAuth()
  const location = useLocation()

  const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@joycomethministries7999'
  const YOUTUBE_LIVE_URL = 'https://www.youtube.com/@joycomethministries7999/live'

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/browse-services', label: 'Services' },
    { to: '/categories', label: 'Categories' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const aboutDropdownItems = [
    { to: '/programs', label: 'Programs' },
    { to: '/set-man', label: 'Set Man of the Church' },
    { to: '/prayers-testimony', label: 'Prayers and Testimony' },
    { to: '/giving', label: 'Giving' },
  ]

  // Get the correct dashboard URL based on user role
  const getDashboardUrl = () => {
    if (!user) return '/dashboard'
    
    switch (user.role) {
      case 'seller':
        return '/seller-dashboard'
      case 'buyer':
        return '/dashboard'
      default:
        return '/dashboard'
    }
  }

  // Get dashboard label based on user role
  const getDashboardLabel = () => {
    if (!user) return 'Dashboard'
    
    switch (user.role) {
      case 'seller':
        return 'Seller Dashboard'
      case 'buyer':
        return 'Dashboard'
      default:
        return 'Dashboard'
    }
  }

  // Check if YouTube channel is live
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        setIsCheckingLive(true)
        
        // Method 1: Check using YouTube iframe API (client-side)
        const liveStatus = await checkLiveStatusWithIframe()
        setIsLive(liveStatus as boolean)
        
      } catch (error) {
        console.error('Error checking live status:', error)
        setIsLive(false)
      } finally {
        setIsCheckingLive(false)
      }
    }

    checkLiveStatus()
    
    // Check every 2 minutes if we think they're live, otherwise every 10 minutes
    const interval = setInterval(checkLiveStatus, isLive ? 120000 : 600000)
    
    return () => clearInterval(interval)
  }, [isLive])

  // Client-side live status check using YouTube iframe
  const checkLiveStatusWithIframe = () => {
    return new Promise((resolve) => {
      // Create a temporary iframe to check live status
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = `${YOUTUBE_LIVE_URL}?autoplay=0`
      
      iframe.onload = () => {
        // If the iframe loads successfully to the live stream, they're live
        // If it redirects to a waiting screen or channel page, they're not live
        const currentUrl = iframe.contentWindow?.location.href || ''
        const isCurrentlyLive = currentUrl.includes('/live') && !currentUrl.includes('/streams')
        resolve(isCurrentlyLive)
        
        // Clean up
        document.body.removeChild(iframe)
      }
      
      iframe.onerror = () => {
        resolve(false)
        document.body.removeChild(iframe)
      }
      
      document.body.appendChild(iframe)
      
      // Fallback timeout
      setTimeout(() => {
        resolve(false)
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe)
        }
      }, 5000)
    })
  }

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen)
  const toggleAboutDropdown = () => setIsAboutOpen(!isAboutOpen)

  const handleYouTubeClick = () => {
    if (isLive) {
      // Open live stream in new tab
      window.open(YOUTUBE_LIVE_URL, '_blank', 'noopener,noreferrer')
    } else {
      // Redirect to channel
      window.open(YOUTUBE_CHANNEL_URL, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        {/* Brand Logo - Always on the left */}
        <Link to="/" className="flex items-center flex-shrink-0 gap-3">
          <img src="/assets/images/joydome.png" alt="JoyDome Logo" className="object-cover w-10 h-10 rounded-full" />
          <span className="text-lg font-extrabold text-gray-900 whitespace-nowrap">
            Joy<span className="text-primary-blue">Dome</span>
          </span>
        </Link>

        {/* Navigation Links - Centered */}
        <nav className="items-center hidden mx-8 text-base font-semibold text-gray-800 md:flex gap-7">
          {navLinks.map((link) => (
            link.to === '/about' ? (
              <div key={link.to} className="relative">
                <button
                  onClick={toggleAboutDropdown}
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                  className={`flex items-center gap-1 hover:text-primary-blue transition ${
                    location.pathname.startsWith('/about') || aboutDropdownItems.some(item => location.pathname === item.to) 
                      ? 'text-primary-blue' 
                      : ''
                  }`}
                >
                  {link.label}
                  <FaChevronDown className={`h-3 w-3 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isAboutOpen && (
                  <div 
                    className="absolute left-0 z-50 w-48 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full"
                    onMouseEnter={() => setIsAboutOpen(true)}
                    onMouseLeave={() => setIsAboutOpen(false)}
                  >
                    {aboutDropdownItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-primary-blue"
                        onClick={() => setIsAboutOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-primary-blue transition whitespace-nowrap ${
                  location.pathname === link.to ? 'text-primary-blue' : ''
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right Section - YouTube, User Actions, etc. */}
        <div className="flex items-center gap-4">
          {/* YouTube Button - Always visible */}
          <button
            onClick={handleYouTubeClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all relative whitespace-nowrap ${
              isLive 
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg ring-2 ring-red-400' 
                : 'bg-red-600 text-white hover:bg-red-700'
            } ${isLive ? 'animate-pulse' : ''}`}
            disabled={isCheckingLive}
            title={isLive ? "We're live! Click to watch" : "Visit our YouTube channel"}
          >
            <FaYoutube className="w-5 h-5" />
            <span className="hidden sm:inline">
              {isCheckingLive ? 'Checking...' : (isLive ? 'Live Now' : 'YouTube')}
            </span>
            {isLive && (
              <span className="flex w-3 h-3 ml-1">
                <span className="absolute inline-flex w-3 h-3 bg-white rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
              </span>
            )}
          </button>

          {/* User Actions */}
          <div className="items-center hidden gap-3 md:flex">
            {user ? (
              <>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </span>
                </div>
                <Link 
                  to={getDashboardUrl()} 
                  className="px-4 py-2 text-sm font-semibold transition border rounded-lg text-primary-blue border-primary-blue hover:bg-primary-blue hover:text-white whitespace-nowrap"
                >
                  {getDashboardLabel()}
                </Link>
                <Link 
                  to="/logout-page" 
                  className="px-4 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-semibold transition text-primary-blue hover:text-primary-dark whitespace-nowrap">
                  Sign in
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-semibold text-white transition rounded-lg bg-primary-blue hover:bg-primary-dark whitespace-nowrap">
                  Join
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu} 
            className="p-2 rounded-md md:hidden hover:bg-gray-100" 
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <FaTimes className="w-6 h-6 text-gray-800" /> : <FaBars className="w-6 h-6 text-gray-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="bg-white border-t border-gray-200 md:hidden">
          <div className="container grid gap-3 py-3 mx-auto text-base font-semibold text-gray-800">
            {navLinks.map((link) => (
              link.to === '/about' ? (
                <div key={link.to} className="py-2">
                  <button
                    onClick={() => {
                      const aboutSection = document.getElementById('mobile-about-section');
                      aboutSection?.classList.toggle('hidden');
                    }}
                    className="flex items-center justify-between w-full transition hover:text-primary-blue"
                  >
                    <span>About</span>
                    <FaChevronDown className="w-3 h-3" />
                  </button>
                  <div id="mobile-about-section" className="hidden pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                    {aboutDropdownItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block py-2 text-sm transition hover:text-primary-blue"
                        onClick={toggleMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.to} to={link.to} className="py-2 transition hover:text-primary-blue" onClick={toggleMobileMenu}>
                  {link.label}
                </Link>
              )
            ))}
            
            {/* Mobile YouTube Button */}
            <button
              onClick={() => {
                handleYouTubeClick()
                toggleMobileMenu()
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all ${
                isLive 
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              } ${isLive ? 'animate-pulse' : ''}`}
            >
              <FaYoutube className="w-5 h-5" />
              <span>{isLive ? 'Live Now' : 'YouTube'}</span>
              {isLive && (
                <span className="flex w-3 h-3">
                  <span className="absolute inline-flex w-3 h-3 bg-white rounded-full opacity-75 animate-ping"></span>
                  <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
                </span>
              )}
            </button>

            {/* Mobile User Section */}
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Welcome back</p>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <span className="inline-block px-2 py-1 mt-1 text-xs font-medium text-white capitalize rounded-full bg-primary-blue">
                      {user.role}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      to={getDashboardUrl()} 
                      className="py-2 text-sm font-semibold text-center text-white transition rounded-lg bg-primary-blue hover:bg-primary-dark" 
                      onClick={toggleMobileMenu}
                    >
                      {getDashboardLabel()}
                    </Link>
                    <Link 
                      to="/logout-page" 
                      className="py-2 text-sm font-semibold text-center text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                      onClick={toggleMobileMenu}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    to="/login" 
                    className="py-2 text-sm font-semibold text-center transition border rounded-lg text-primary-blue border-primary-blue hover:bg-primary-blue hover:text-white" 
                    onClick={toggleMobileMenu}
                  >
                    Sign in
                  </Link>
                  <Link 
                    to="/signup" 
                    className="py-2 text-sm font-semibold text-center text-white transition rounded-lg bg-primary-blue hover:bg-primary-dark" 
                    onClick={toggleMobileMenu}
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header