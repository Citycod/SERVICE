import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="py-12 text-gray-400 bg-neutral-900">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/images/joydome.png" alt="JoyDome Logo" className="w-10 h-10 rounded-xl" />
              <span className="text-sm font-semibold text-white">
                Joy <span className="text-primary-blue">Dome</span>
              </span>
            </div>
            <p className="text-sm">Connecting Nigerians with trusted services like catering, plumbing, and more.</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="flex items-center justify-center w-8 h-8 transition bg-gray-800 rounded-full hover:bg-gray-700">
                <i className="w-4 h-4 text-white fab fa-facebook-f"></i>
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 transition bg-gray-800 rounded-full hover:bg-gray-700">
                <i className="w-4 h-4 text-white fab fa-instagram"></i>
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 transition bg-gray-800 rounded-full hover:bg-gray-700">
                <i className="w-4 h-4 text-white fab fa-twitter"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="transition hover:text-white">About Us</Link></li>
              <li><Link to="/browse-services" className="transition hover:text-white">Services</Link></li>
              <li><Link to="/contact" className="transition hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help-center" className="transition hover:text-white">Help Center</Link></li>
              <li><Link to="/faq" className="transition hover:text-white">FAQs</Link></li>
              <li><Link to="/privacy-policy" className="transition hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: oluwayinkaogunbodebiz@gmail.com</li>
              <li>Phone: +234 8140728174</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-800 md:flex-row">
          <p className="text-sm text-gray-400">© 2025 Joy <span className="text-primary-blue">Dome</span>. All rights reserved.</p>
          <span className="flex">
            Made By <a href="https://uplix.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary-blue">Uplix</a>
          </span>
          <div className="flex gap-6 mt-4 text-sm md:mt-0">
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer