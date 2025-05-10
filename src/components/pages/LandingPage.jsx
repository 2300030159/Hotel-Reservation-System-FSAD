
import { useState } from 'react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-roboto text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-playfair font-bold text-indigo-600">LuxeStay</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-600 hover:text-indigo-600 transition duration-300">Home</a>
              <a href="#about" className="text-gray-600 hover:text-indigo-600 transition duration-300">About</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition duration-300">Contact</a>
              <a href="login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">Book Now</a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-indigo-600 focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#home" className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md">Home</a>
                <a href="#about" className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md">About</a>
                <a href="#contact" className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md">Contact</a>
                <a href="#" className="block bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700">Book Now</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 leading-tight">Experience Timeless Luxury</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Discover unparalleled comfort and elegance at LuxeStay Hotel, where every stay is unforgettable.</p>
          <a href="#contact" className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition duration-300">Reserve Your Room</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-playfair font-bold text-center text-gray-800 mb-12">About LuxeStay</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                LuxeStay Hotel offers a sanctuary of sophistication and comfort. Nestled in the heart of the city, our hotel combines modern amenities with timeless elegance to create an unforgettable experience for every guest.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                From our luxurious suites to our world-class dining, every detail is designed with your comfort in mind. Whether you're here for business or leisure, LuxeStay is your home away from home.
              </p>
            </div>
            <div className="flex justify-center">
              <img src="https://images.unsplash.com/photo-1578683014728-c73504a258f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hotel Interior" className="rounded-lg shadow-lg max-w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-playfair font-bold text-center text-gray-800 mb-12">Get in Touch</h2>
          <form className="max-w-lg mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600" placeholder="Your Email" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600" placeholder="Your Message"></textarea>
            </div>
            <div>
              <button type="button" className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition duration-300">Send Message</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-playfair font-bold mb-4">LuxeStay Hotel</h3>
              <p className="text-gray-400">123 Elegance Avenue, City Center, 12345</p>
              <p className="text-gray-400 mt-2">info@luxestayhotel.com</p>
              <p className="text-gray-400 mt-2">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xl font-playfair font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-playfair font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.5-10 10 0 4.41 3.58 8.06 8.06 8.88v-6.28h-2.43v-2.6h2.43v-1.98c0-2.4 1.47-3.7 3.62-3.7 1.03 0 1.92.08 2.18.11v2.53h-1.5c-1.17 0-1.4.56-1.4 1.37v1.8h2.8l-.45 2.6h-2.35v6.28c4.48-.82 8.06-4.47 8.06-8.88 0-5.5-4.5-10-10-10z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.95 4.57a10 10 0 0 1-2.83.77 4.92 4.92 0 0 0 2.16-2.72 9.86 9.86 0 0 1-3.12 1.19 4.92 4.92 0 0 0-8.38 4.48A13.94 13.94 0 0 1 1.67 3.15a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.61v.06a4.92 4.92 0 0 0 3.95 4.83 4.92 4.92 0 0 1-2.22.08 4.92 4.92 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.06 0 14.01-7.51 14.01-14.01 0-.21 0-.42-.02-.63A10.02 10.02 0 0 0 24 4.56l-.05.01z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2025 LuxeStay Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;