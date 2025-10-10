import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [counters, setCounters] = useState({ satisfaction: 0, professionals: 0, projects: 0, delivery: 0 })
  const [carouselIndex, setCarouselIndex] = useState(0)
  const statsRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  const suggestions = [
    { name: 'Fashion Designer', sub: 'Traditional & modern attire', icon: '/assets/images/fashion-design.jpeg', type: 'popular' },
    { name: 'Catering', sub: 'Events & special occasions', icon: 'fas fa-utensils', type: 'popular' },
    { name: 'Plumbing', sub: 'Repairs & installations', icon: 'fas fa-faucet', type: 'popular' },
    { name: 'Carpentry', sub: 'Furniture & woodwork', icon: 'fas fa-hammer', type: 'other' },
    { name: 'Real Estate', sub: 'Properties & rentals', icon: 'fas fa-home', type: 'other' },
    { name: 'Electrical', sub: 'Wiring & installations', icon: 'fas fa-bolt', type: 'other' },
  ]

  const trending = ['Fashion Designer', 'Catering', 'Plumbing', 'Hair Stylist', 'Event Planning']

  const services = [
    { id: 1, name: 'Fashion Design', image: '/assets/images/fashion design.jpeg' },
    { id: 2, name: 'Catering', image: '/assets/images/catering.jpeg' },
    { id: 3, name: 'Plumbing', image: '/assets/images/plumbing.jpeg' },
    { id: 4, name: 'Consulting', image: '/assets/images/consulting.jpg' },
    { id: 5, name: 'Carpentry', image: '/assets/images/carpentry.jpeg' },
    { id: 6, name: 'Real Estate', image: '/assets/images/real estate.jpeg' },
    { id: 7, name: 'Teaching', image: '/assets/images/teaching.jpg' },
  ]

  const professionals = [
    { id: 1, name: 'Chiamaka Okoro', role: 'Fashion Designer', location: 'Lagos', desc: 'Traditional and modern Nigerian fashion designs with 5+ years experience.', rating: 4.9, reviews: 230, price: 15000, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' },
    { id: 2, name: 'Adebola Johnson', role: 'Caterer', location: 'Abuja', desc: 'Expert in Nigerian cuisine for events and special occasions.', rating: 4.8, reviews: 180, price: 30000, image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=200' },
    { id: 3, name: 'Oluwaseun Adeyemi', role: 'Plumber', location: 'Ibadan', desc: 'Reliable plumbing services for repairs and installations.', rating: 4.7, reviews: 150, price: 10000, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200' },
    { id: 4, name: 'Ngozi Balogun', role: 'Event Planner', location: 'Lagos', desc: 'Professional event planning for weddings and corporate events.', rating: 4.9, reviews: 200, price: 25000, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' },
    { id: 5, name: 'Emeka Uche', role: 'Carpenter', location: 'Enugu', desc: 'Custom furniture and woodwork with attention to detail.', rating: 4.8, reviews: 120, price: 20000, image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200' },
  ]

  const testimonials = [
    {
      id: 1,
      text: '"I found the perfect tailor for my traditional wedding attire through JoyDome Nigeria. The quality was exceptional!"',
      name: 'Amina Sule',
      role: 'Lagos • Bride',
      image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=200',
    },
    {
      id: 2,
      text: '"As a caterer, JoyDome Nigeria has connected me with so many clients. My business has grown 200% in just 6 months!"',
      name: 'Chioma Okeke',
      role: 'Abuja • Caterer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    },
    {
      id: 3,
      text: '"I needed a reliable plumber urgently, and JoyDome Nigeria connected me with a professional who fixed my issue within hours."',
      name: 'Oluwaseun Adeyemi',
      role: 'Ibadan • Homeowner',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const interval1 = setInterval(() => setCounters(prev => ({ ...prev, satisfaction: prev.satisfaction < 95 ? prev.satisfaction + 1 : 95 })), 20)
          const interval2 = setInterval(() => setCounters(prev => ({ ...prev, professionals: prev.professionals < 2500 ? prev.professionals + 50 : 2500 })), 10)
          const interval3 = setInterval(() => setCounters(prev => ({ ...prev, projects: prev.projects < 15000 ? prev.projects + 100 : 15000 })), 5)
          const interval4 = setInterval(() => setCounters(prev => ({ ...prev, delivery: prev.delivery < 98 ? prev.delivery + 1 : 98 })), 20)
          setTimeout(() => {
            clearInterval(interval1)
            clearInterval(interval2)
            clearInterval(interval3)
            clearInterval(interval4)
          }, 2000)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setShowSuggestions(false)
    navigate(`/search?q=${encodeURIComponent(value)}`)
  }

  const visibleCards = 5
  const handlePrev = () => setCarouselIndex(prev => Math.max(prev - 1, 0))
  const handleNext = () => setCarouselIndex(prev => Math.min(prev + 1, professionals.length - visibleCards))

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 animate-fade-in">
            <img alt="Hero" src="/assets/images/hero1.jpg" className="absolute inset-0 h-full w-full object-cover opacity-60" />
            <div className="relative z-10 px-6 py-14 md:px-14 md:py-16 lg:py-20">
              <div className="max-w-xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
                  Connect with Top Nigerian <br />Professionals & Artisans
                </h1>
                <p className="mt-4 text-sm md:text-base text-gray-200">
                  JoyDome is a platform where you can find skilled Nigerian professionals for all your needs - from fashion design to home services.
                </p>
                <div className="mt-6 search-container max-w-2xl mx-auto">
                  <div className="flex items-stretch overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-primary-blue">
                    <div className="grid place-items-center px-3 text-gray-400">
                      <i className="fas fa-search h-5 w-5"></i>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setShowSuggestions(e.target.value.trim() !== '')
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                      className="flex-1 px-3 py-2 text-sm focus:outline-none placeholder-gray-400"
                      placeholder="Find Nigerian services.. (Try 'Fashion Designer')"
                      aria-label="Search for services"
                    />
                    <button onClick={() => handleSearch(searchQuery)} className="px-4 bg-primary-blue text-white hover:bg-primary-dark transition">
                      <i className="fas fa-search h-5 w-5"></i>
                    </button>
                  </div>
                  {showSuggestions && (
                    <div className="search-suggestions mt-2 bg-white shadow-lg rounded-lg border border-gray-100">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Popular Services</div>
                      <div className="divide-y">
                        {suggestions.filter(s => s.type === 'popular').map((sug, idx) => (
                          <div
                            key={idx}
                            className="search-suggestion"
                            onClick={() => handleSearch(sug.name)}
                          >
                            {sug.icon.startsWith('/') ? (
                              <img src={sug.icon} alt={sug.name} className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <i className={`${sug.icon} suggestion-icon`}></i>
                            )}
                            <div>
                              <div className="font-medium">{sug.name}</div>
                              <div className="text-xs text-gray-500">{sug.sub}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Other Services</div>
                      <div className="divide-y">
                        {suggestions.filter(s => s.type === 'other').map((sug, idx) => (
                          <div
                            key={idx}
                            className="search-suggestion"
                            onClick={() => handleSearch(sug.name)}
                          >
                            <i className={`${sug.icon} suggestion-icon`}></i>
                            <div>
                              <div className="font-medium">{sug.name}</div>
                              <div className="text-xs text-gray-500">{sug.sub}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <div className="text-sm text-gray-600 mb-3 font-semibold flex items-center gap-2">
                    <i className="fas fa-chart-line h-4 w-4 text-primary-blue"></i>
                    Trending searches
                  </div>
                  <div className="trending-searches">
                    {trending.map((tag, idx) => (
                      <button
                        key={idx}
                        className="trending-badge"
                        onClick={() => handleSearch(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center animate-fade-in">
            <div className="stat-number">{counters.satisfaction}%</div>
            <p className="text-gray-600 text-sm mt-2">Client Satisfaction</p>
          </div>
          <div className="text-center animate-fade-in">
            <div className="stat-number">{counters.professionals.toLocaleString()}+</div>
            <p className="text-gray-600 text-sm mt-2">Skilled Professionals</p>
          </div>
          <div className="text-center animate-fade-in">
            <div className="stat-number">{counters.projects.toLocaleString()}+</div>
            <p className="text-gray-600 text-sm mt-2">Projects Completed</p>
          </div>
          <div className="text-center animate-fade-in">
            <div className="stat-number">{counters.delivery}%</div>
            <p className="text-gray-600 text-sm mt-2">On-Time Delivery</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Popular Nigerian Services</h2>
          <Link to="/browse-services" className="text-sm text-primary-blue hover:underline flex items-center no-underline">
            View all services <i className="fas fa-arrow-right ml-1 text-xs"></i>
          </Link>
        </div>
        <div className="mt-5 flex space-x-4 overflow-x-auto scrollbar-hide">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/service/${service.id}`}
              className="relative min-w-[180px] h-28 rounded-lg overflow-hidden group flex-shrink-0"
            >
              <img src={service.image} alt={service.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>
              <div className="relative flex items-center justify-center h-full text-white font-semibold">
                {service.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-16 px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How JoyDome Nigeria Works</h2>
            <p className="text-lg text-gray-600 mt-4">Getting your projects done has never been easier. Follow these simple steps to connect with top Nigerian talent.</p>
            <div className="mt-10 space-y-6">
              <div className="flex items-start p-5 border border-blue-100 rounded-xl bg-white hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-primary-blue mr-4">
                  <i className="fas fa-tasks text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Post a Task</h3>
                  <p className="text-gray-600 text-sm mt-1">Describe your project, set your budget, and timeline. It's free and takes just a few minutes.</p>
                </div>
              </div>
              <div className="flex items-start p-5 border border-blue-100 rounded-xl bg-white hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-primary-blue mr-4">
                  <i className="fas fa-file-alt text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Get Proposals</h3>
                  <p className="text-gray-600 text-sm mt-1">Receive competitive bids from skilled Nigerian professionals within hours.</p>
                </div>
              </div>
              <div className="flex items-start p-5 border border-blue-100 rounded-xl bg-white hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-primary-blue mr-4">
                  <i className="fas fa-handshake text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Choose & Collaborate</h3>
                  <p className="text-gray-600 text-sm mt-1">Select the perfect match and work together securely through our platform.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-blue-50 absolute"></div>
            <img src="/assets/images/work.jpg" alt="How it works" className="relative z-10 rounded-lg w-80 md:w-[22rem] object-cover" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-blue-50"></div>
              <img src="/assets/images/pic.jpg" alt="JoyDome Team" className="relative z-10 w-full h-full object-cover shadow-lg rounded-full" />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose JoyDome Nigeria</h2>
            <p className="text-gray-600 mb-8">We're committed to providing the best experience for both clients and service providers across Nigeria.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-5 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-primary-blue flex-shrink-0">
                  <i className="fas fa-shield-alt text-lg"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Secure Payments</h3>
                  <p className="text-gray-600 text-sm">Your funds are held securely until you approve the work and are satisfied with the results.</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-primary-blue flex-shrink-0">
                  <i className="fas fa-users text-lg"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Verified Professionals</h3>
                  <p className="text-gray-600 text-sm">All our service providers are verified Nigerian professionals with proven track records.</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-primary-blue flex-shrink-0">
                  <i className="fas fa-hand-holding-usd text-lg"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Cost Effective</h3>
                  <p className="text-gray-600 text-sm">Get quality work done at competitive rates without compromising on quality.</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-primary-blue flex-shrink-0">
                  <i className="fas fa-headset text-lg"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Dedicated Support</h3>
                  <p className="text-gray-600 text-sm">Our support team is available to help you throughout your project journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-16 px-4 relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-2xl md:text-3xl font-bold">Top-Rated Nigerian Professionals</h3>
          <Link to="/browse-services" className="text-sm font-medium text-primary-blue hover:text-primary-dark transition flex items-center">
            View all professionals <i className="fas fa-arrow-right ml-1 text-xs"></i>
          </Link>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button onClick={handlePrev} className="bg-white shadow-md rounded-full p-3 hover:bg-gray-50" aria-label="Previous">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={handleNext} className="bg-white shadow-md rounded-full p-3 hover:bg-gray-50" aria-label="Next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" style={{ transform: `translateX(-${carouselIndex * (100 / visibleCards)}%)`, transition: 'transform 0.3s ease' }}>
          {professionals.map((pro) => (
            <div key={pro.id} className="card p-6 text-center">
              <img className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-blue-50" src={pro.image} alt={pro.name} />
              <div className="mt-3 text-base font-semibold">{pro.name}</div>
              <div className="text-xs text-gray-500">{pro.role} • {pro.location}</div>
              <p className="mt-3 text-sm text-gray-600">{pro.desc}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1 text-yellow-500">
                  <i className="fas fa-star text-xs"></i>
                  <span className="text-gray-700">{pro.rating}</span>
                  <span className="text-gray-400">({pro.reviews}+)</span>
                </div>
                <div className="rounded-full bg-blue-50 text-primary-blue px-3 py-1 font-medium">₦{pro.price.toLocaleString()}</div>
              </div>
              <Link to={`/profile/${pro.id}`} className="mt-4 w-full block rounded-lg bg-primary-blue px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark transition">
                Hire Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-20 px-4">
        <h3 className="section-title">What Nigerians Say About Us</h3>
        <p className="mt-2 text-center text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          Real experiences from our trusted users across Nigeria.
        </p>
        <div className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-[85%] md:min-w-0 rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition snap-center">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
              </div>
              <p className="text-sm leading-relaxed text-gray-700 italic">{testimonial.text}</p>
              <div className="mt-5 flex items-center gap-3">
                <img className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-50" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <div className="text-sm font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-20 grid gap-10 px-4 md:grid-cols-2 md:items-center">
        <div className="overflow-hidden rounded-2xl shadow-lg animate-fade-in">
          <img className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500" src="/assets/images/confidence.jpg" alt="Nigerian professionals" />
        </div>
        <div className="md:pl-6">
          <h3 className="text-2xl md:text-3xl font-bold leading-snug">
            Work with Confidence: <span className="text-primary-blue">Guaranteed & Secure</span>
          </h3>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            Discover why we’re Nigeria’s most trusted marketplace for local services like catering and plumbing. Every booking is secure.
          </p>
          <ul className="mt-6 space-y-4 text-sm md:text-base text-gray-700">
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-primary-blue font-bold">✓</span>
              Instant access to verified Nigerian professionals
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-primary-blue font-bold">✓</span>
              24/7 dedicated customer support
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-primary-blue font-bold">✓</span>
              Peace of mind with our money-back guarantee
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-primary-blue font-bold">✓</span>
              Local payment options including bank transfer
            </li>
          </ul>
          <Link to="/browse-services" className="mt-8 inline-block px-6 py-3 rounded-xl bg-primary-blue text-white font-semibold shadow hover:bg-primary-dark hover:shadow-lg transition">
            Find Nigerian Professionals
          </Link>
        </div>
      </section>

      <div className="relative w-full overflow-hidden bg-gray-50 py-6 mt-12">
        <div className="marquee-container">
          <div className="marquee-content">
            {['Lagos State', 'Abuja', 'Kano', 'Port Harcourt', 'Ibadan', 'Benin City'].map((city, idx) => (
              <div key={idx} className="grid h-10 px-4 place-items-center rounded-lg border border-dashed border-gray-300 bg-white text-sm shadow-sm">
                {city}
              </div>
            ))}
            {['Lagos State', 'Abuja', 'Kano', 'Port Harcourt', 'Ibadan', 'Benin City'].map((city, idx) => (
              <div key={`dup-${idx}`} className="grid h-10 px-4 place-items-center rounded-lg border border-dashed border-gray-300 bg-white text-sm shadow-sm">
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="relative bg-primary-blue py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/70 to-primary-blue/70"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">Ready to Get Started? 🚀</h2>
          <p className="mt-4 text-blue-100 max-w-2xl mx-auto text-sm md:text-base">
            Join <span className="font-semibold text-white">thousands of Nigerians</span> already growing their businesses and finding trusted professionals through our platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse-services" className="px-6 py-3 rounded-xl bg-white text-primary-blue font-semibold shadow hover:bg-gray-100 hover:shadow-lg transition">
              Find a Professional
            </Link>
            <Link to="/signup?role=seller" className="px-6 py-3 rounded-xl bg-primary-dark text-white font-semibold shadow hover:bg-blue-900 hover:shadow-lg transition">
              Become a Provider
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 md:h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L60,186.7C120,181,240,171,360,176C480,181,600,203,720,213.3C840,224,960,224,1080,213.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </>
  )
}

export default Home