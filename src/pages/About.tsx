
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden text-white bg-gradient-to-r from-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute bg-blue-500 rounded-full top-20 left-10 w-72 h-72 mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bg-indigo-500 rounded-full top-40 right-10 w-72 h-72 mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bg-purple-500 rounded-full bottom-20 left-20 w-72 h-72 mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        <div className="container relative px-4 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Welcome to <span className="text-amber-400">JoyDome</span>
          </h1>
          <p className="max-w-3xl mx-auto mb-10 text-xl font-light md:text-2xl">
            Where talent meets opportunity. We're building the future of professional services through innovation, trust, and excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 font-semibold text-blue-700 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 hover:-translate-y-1"
              aria-label="Get started with JoyDome"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 font-semibold text-white transition-all duration-300 transform border-2 border-white rounded-lg hover:bg-white hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 hover:-translate-y-1"
              aria-label="Contact JoyDome team"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Our Mission & Vision</h2>
            <div className="w-20 h-1 mx-auto bg-blue-600"></div>
          </div>
          
          <div className="grid max-w-5xl gap-10 mx-auto md:grid-cols-2">
            <div className="p-8 transition-all duration-300 transform bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-blue-700">Our Mission</h3>
              </div>
              <p className="leading-relaxed text-gray-700">
                To empower professionals and businesses by creating a seamless, trusted marketplace where talents thrive, 
                fostering growth and innovation for all involved through cutting-edge technology and exceptional service.
              </p>
            </div>
            
            <div className="p-8 transition-all duration-300 transform bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-indigo-100 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-indigo-700">Our Vision</h3>
              </div>
              <p className="leading-relaxed text-gray-700">
                To be the world's most trusted professional services platform, recognized for our commitment to quality, 
                transparency, and community, while continuously evolving to meet the changing needs of the modern workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-gray-600">The principles that guide everything we do</p>
            <div className="w-20 h-1 mx-auto mt-4 bg-blue-600"></div>
          </div>
          
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
            <div className="p-8 text-center transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Innovation</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Continuously enhancing our platform with cutting-edge technology to deliver exceptional user experiences.
              </p>
            </div>
            
            <div className="p-8 text-center transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-2xl">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Integrity</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Upholding the highest ethical standards and transparency in all our operations and interactions.
              </p>
            </div>
            
            <div className="p-8 text-center transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-2xl">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Community</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Building a supportive, inclusive ecosystem where professionals and clients can thrive together.
              </p>
            </div>
            
            <div className="p-8 text-center transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-2xl">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Excellence</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Committed to delivering exceptional quality and value in every aspect of our platform and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Our Story</h2>
            <p className="max-w-2xl mx-auto text-gray-600">From vision to reality: The JoyDome journey</p>
            <div className="w-20 h-1 mx-auto mt-4 bg-blue-600"></div>
          </div>
          
          <div className="max-w-4xl p-12 mx-auto transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-3xl hover:shadow-xl">
            <p className="text-lg leading-relaxed text-center text-gray-700">
              JoyDome began with a simple yet powerful idea: to create a bridge between exceptional talent and those seeking 
              high-quality professional services. Founded in 2023 by a team of industry veterans and tech innovators, we've 
              grown from a startup vision to a thriving community of professionals. Our journey has been guided by a passion 
              for connecting people, a commitment to excellence, and a belief in the transformative power of technology.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-center text-gray-700">
              Today, we're proud to have facilitated thousands of successful collaborations across diverse industries, 
              continually expanding our offerings to meet the evolving needs of the modern workforce. As we look to the future, 
              our commitment remains unwavering: to build the world's most trusted platform for professional services.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Why Choose JoyDome?</h2>
            <p className="max-w-2xl mx-auto text-gray-600">Experience the difference of a platform built with purpose</p>
            <div className="w-20 h-1 mx-auto mt-4 bg-blue-600"></div>
          </div>
          
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
            <div className="p-8 transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center mr-5 bg-blue-100 w-14 h-14 rounded-xl">
                  <svg className="text-blue-600 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Verified Professionals</h3>
              </div>
              <p className="leading-relaxed text-gray-600">
                Every professional on our platform undergoes a rigorous verification process, ensuring you work with trusted, qualified experts.
              </p>
            </div>
            
            <div className="p-8 transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center mr-5 bg-green-100 w-14 h-14 rounded-xl">
                  <svg className="text-green-600 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Seamless Experience</h3>
              </div>
              <p className="leading-relaxed text-gray-600">
                Our intuitive platform makes it easy to find, hire, and collaborate with professionals, saving you time and effort.
              </p>
            </div>
            
            <div className="p-8 transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center mr-5 bg-purple-100 w-14 h-14 rounded-xl">
                  <svg className="text-purple-600 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Tailored Solutions</h3>
              </div>
              <p className="leading-relaxed text-gray-600">
                Find services perfectly matched to your specific needs, budget, and timeline with our intelligent matching system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600">Active Professionals</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-green-600">25K+</div>
              <div className="text-gray-600">Successful Projects</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-amber-600">15+</div>
              <div className="text-gray-600">Service Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white bg-gradient-to-r from-blue-700 to-indigo-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold">Ready to Experience JoyDome?</h2>
          <p className="max-w-3xl mx-auto mb-10 text-xl opacity-90">
            Join thousands of professionals and clients who are already transforming the way they work and collaborate.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              to="/signup"
              className="px-8 py-4 font-semibold text-blue-700 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 hover:-translate-y-1"
              aria-label="Create your JoyDome account"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 font-semibold text-white transition-all duration-300 transform border-2 border-white rounded-lg hover:bg-white hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 hover:-translate-y-1"
              aria-label="Log in to your account"
            >
              Login
            </Link>
          </div>
          
          <p className="text-sm opacity-80">
            Have questions? <Link to="/contact" className="font-semibold underline hover:no-underline">Contact our team</Link>
          </p>
        </div>
      </section>

    </div>
  );
};

export default About;