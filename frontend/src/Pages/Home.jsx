import React, { useState, useEffect } from "react";
import { Menu, X, Clock, Star, Shield } from "lucide-react";
import heroPageImage from "../Assets/heroPageImage.png";
import { FaHandshakeAngle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token');
    
    if (isLoggedIn && token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  // Handle scroll for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Outer Container */}
      <div className="relative w-full bg-white border-2 border-gray-300 rounded-lg min-h-screen overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-indigo-50 pointer-events-none z-0"></div>

        {/* Navigation Bar - Sticky */}
        <nav 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-white shadow-lg py-3' 
              : 'bg-white shadow-sm py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className={`transition-all duration-300 ${
                  isScrolled ? 'w-10 h-10' : 'w-12 h-12'
                } bg-sky-600 rounded-xl flex items-center justify-center`}>
                  <FaHandshakeAngle className={`transition-all duration-300 ${
                    isScrolled ? 'w-6 h-5' : 'w-7 h-6'
                  } text-white`} />
                </div>
                <h1 className={`transition-all duration-300 ${
                  isScrolled ? 'text-[32px]' : 'text-[40px]'
                } font-bold text-sky-600 font-inter mr-0 flex`}>
                  Hire
                  <h3 className={`transition-all duration-300 ${
                    isScrolled ? 'text-[24px] mt-4' : 'text-[29px] mt-6'
                  }`}>Helper</h3>
                </h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex gap-12 items-center">
                <a href="#about" className="text-lg font-semibold text-black hover:text-sky-600 transition-colors">
                  About
                </a>
                <a
                  href="#features"
                  className="text-lg font-semibold text-black hover:text-sky-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#services"
                  className="text-lg font-semibold text-black hover:text-sky-600 transition-colors"
                >
                  Services
                </a>
                <a href="#faq" className="text-lg font-semibold text-black hover:text-sky-600 transition-colors">
                  FAQ
                </a>
              </div>

              {/* Buttons */}
              <div className="hidden md:flex gap-3">
                <button
                  className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
                <button
                  className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>

              {/* Mobile Menu */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
              <div className="flex flex-col gap-4 pb-4 mt-4">
                <a href="#about" className="text-lg font-semibold text-black">
                  About
                </a>
                <a
                  href="#features"
                  className="text-lg font-semibold text-black"
                >
                  Features
                </a>
                <a
                  href="#services"
                  className="text-lg font-semibold text-black"
                >
                  Services
                </a>
                <a href="#faq" className="text-lg font-semibold text-black">
                  FAQ
                </a>
                <div className="flex gap-3">
                  <button
                    className="flex-1 py-2 bg-sky-600 text-white font-semibold rounded-lg"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </button>
                  <button
                    className="flex-1 py-2 bg-sky-600 text-white font-semibold rounded-lg"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Spacer for fixed nav */}
        <div className="h-20"></div>

        {/* Hero Section - Centered & Clean */}
        <section className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] py-10 md:py-0" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            {/* Left Text - Clean Design */}
            <div className="space-y-5 text-center md:text-left">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-sky-700 leading-tight">
                  Hire Smarter, Faster
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-600 leading-tight">
                  With Our Helper Hub
                </h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Connect with trusted professionals instantly. Complete tasks
                efficiently with our intelligent platform.
              </p>
              
              <div className="flex gap-3">
                <button
                  className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-all transform hover:scale-105 shadow-lg"
                  onClick={() => navigate("/signin")}
                >
                  Get Started Now
                </button>
                <button
                  className="px-6 py-3 bg-white border-2 border-sky-600 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-all"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up Free
                </button>
              </div>

              {/* Trust Indicators - Compact */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 pt-4">
                <div className="text-center px-3">
                  <div className="text-xl sm:text-2xl font-bold text-sky-700">10k+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center px-3">
                  <div className="text-xl sm:text-2xl font-bold text-sky-700">5k+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Verified Helpers</div>
                </div>
                <div className="text-center px-3">
                  <div className="text-xl sm:text-2xl font-bold text-sky-700">4.9★</div>
                  <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Image - Simple & Clean */}
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl opacity-20 blur-xl"></div>
              <div className="relative h-[320px] md:h-[380px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src={heroPageImage}
                  alt="Work discussion"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="relative z-10 py-20 bg-white" id="features">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
              Why Choose Helper Hub?
            </h2>

            <div className="grid md:grid-cols-3 gap-10 place-items-center">
              <div className="w-64 h-52 bg-white border border-black/20 shadow-md rounded-md flex flex-col items-center justify-center p-6 hover:shadow-xl transition-shadow">
                <Clock className="text-gray-800 mb-3 w-12 h-12" />
                <h3 className="text-xl font-semibold mb-2">Quick Matching</h3>
                <p className="text-gray-700 text-center">
                  Find the right helper in minutes
                </p>
              </div>

              <div className="w-64 h-52 bg-white border border-black/20 shadow-md rounded-md flex flex-col items-center justify-center p-6 hover:shadow-xl transition-shadow">
                <Star className="text-gray-800 mb-3 w-12 h-12" />
                <h3 className="text-xl font-semibold mb-2">Top Rated</h3>
                <p className="text-gray-700 text-center">
                  Verified professionals with great reviews
                </p>
              </div>

              <div className="w-64 h-52 bg-white border border-black/20 shadow-md rounded-md flex flex-col items-center justify-center p-6 hover:shadow-xl transition-shadow">
                <Shield className="text-gray-800 mb-3 w-12 h-12" />
                <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
                <p className="text-gray-700 text-center">
                  Protected payments and verified identities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative z-10 py-12 sm:py-16 md:py-20 bg-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-black">
              Our Services
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {[
                {
                  title: "Home Services",
                  desc: "From cleaning to repairs — find reliable experts instantly.",
                },
                {
                  title: "Office Support",
                  desc: "Get help for office maintenance, admin tasks, and more.",
                },
                {
                  title: "Delivery Assistance",
                  desc: "Fast and safe delivery help at your convenience.",
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-sky-700">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative z-10 py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-0">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How do I find a helper?",
                  a: "Simply sign up, post your task, and browse available professionals.",
                },
                {
                  q: "Are all helpers verified?",
                  a: "Yes, every helper goes through an identity and background verification.",
                },
                {
                  q: "How are payments handled?",
                  a: "Payments are made securely through our protected payment gateway.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-gradient-to-r from-sky-600 to-sky-800 text-white py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-center md:text-left text-white/90 text-sm sm:text-base order-2 md:order-1">
                © 2025 HelperHub. All rights reserved.
              </p>

              <div className="flex gap-4 sm:gap-5 order-3 md:order-2">
                <button className="hover:underline text-sm sm:text-base bg-transparent border-0 cursor-pointer text-white">
                  Privacy Policy
                </button>
                <button className="hover:underline text-sm sm:text-base bg-transparent border-0 cursor-pointer text-white">
                  Terms
                </button>
                <button className="hover:underline text-sm sm:text-base bg-transparent border-0 cursor-pointer text-white">
                  Contact
                </button>
              </div>
              
              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3 order-1 md:order-3 mb-4 md:mb-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-600 rounded-xl flex items-center justify-center">
                  <FaHandshakeAngle className="w-6 h-5 sm:w-7 sm:h-6 text-white" />
                </div>
                <h1 className="text-[32px] sm:text-[40px] font-bold text-white font-inter mr-0 flex">
                  Hire
                  <h3 className="text-[24px] sm:text-[29px] mt-5 sm:mt-6">Helper</h3>
                </h1>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}