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
              ? 'bg-white shadow-lg py-4' 
              : 'bg-white shadow-sm py-6'
          }`}
        >
          <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="flex items-center justify-between">
              {/* Logo - Left Aligned */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`transition-all duration-300 ${
                  isScrolled ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-14 h-14 sm:w-16 sm:h-16'
                } bg-sky-600 rounded-xl flex items-center justify-center shadow-md`}>
                  <FaHandshakeAngle className={`transition-all duration-300 ${
                    isScrolled ? 'w-7 h-6 sm:w-8 sm:h-7' : 'w-8 h-7 sm:w-10 sm:h-9'
                  } text-white`} />
                </div>
                <h1 className={`transition-all duration-300 ${
                  isScrolled ? 'text-[36px] sm:text-[42px]' : 'text-[42px] sm:text-[52px]'
                } font-bold text-sky-600 font-inter flex items-baseline`}>
                  Hire
                  <h3 className={`transition-all duration-300 ${
                    isScrolled ? 'text-[26px] sm:text-[30px]' : 'text-[30px] sm:text-[38px]'
                  } ml-1`}>Helper</h3>
                </h1>
              </div>

              {/* Desktop Menu - Center */}
              <div className="hidden lg:flex gap-8 xl:gap-12 items-center">
                <a href="#about" className="text-lg xl:text-xl font-semibold text-gray-700 hover:text-sky-600 transition-colors">
                  About
                </a>
                <a
                  href="#features"
                  className="text-lg xl:text-xl font-semibold text-gray-700 hover:text-sky-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#services"
                  className="text-lg xl:text-xl font-semibold text-gray-700 hover:text-sky-600 transition-colors"
                >
                  Services
                </a>
                <a href="#faq" className="text-lg xl:text-xl font-semibold text-gray-700 hover:text-sky-600 transition-colors">
                  FAQ
                </a>
              </div>

              {/* Buttons - Right Aligned */}
              <div className="hidden lg:flex gap-4 items-center">
                <button
                  className="px-6 xl:px-8 py-3 xl:py-3.5 text-lg xl:text-xl bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-all transform hover:scale-105 shadow-md"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
                <button
                  className="px-6 xl:px-8 py-3 xl:py-3.5 text-lg xl:text-xl bg-white border-2 border-sky-600 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-all transform hover:scale-105 shadow-md"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={32} className="text-gray-700" /> : <Menu size={32} className="text-gray-700" />}
              </button>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
              <div className="lg:hidden flex flex-col gap-5 pb-6 mt-6 border-t pt-6">
                <a href="#about" className="text-xl font-semibold text-gray-700 hover:text-sky-600 transition-colors">
                  About
                </a>
                <a
                  href="#features"
                  className="text-xl font-semibold text-gray-700 hover:text-sky-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#services"
                  className="text-xl font-semibold text-gray-700 hover:text-sky-600 transition-colors"
                >
                  Services
                </a>
                <a href="#faq" className="text-xl font-semibold text-gray-700 hover:text-sky-600 transition-colors">
                  FAQ
                </a>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <button
                    className="w-full sm:flex-1 py-3.5 text-lg bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-all shadow-md"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </button>
                  <button
                    className="w-full sm:flex-1 py-3.5 text-lg bg-white border-2 border-sky-600 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-all shadow-md"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Spacer for fixed nav - Responsive */}
        <div className="h-24 sm:h-28 md:h-32"></div>

        {/* Hero Section - Full Screen */}
        <section className="relative z-10 flex items-center justify-center min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-8rem)] py-10 md:py-0" id="about">
          <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Text - Enhanced Design */}
            <div className="space-y-8 text-center md:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-sky-700 leading-tight">
                  Hire Smarter, Faster
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-sky-600 leading-tight">
                  With Our Helper Hub
                </h2>
              </div>
              
              <p className="text-xl sm:text-2xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                Connect with trusted professionals instantly. Complete tasks
                efficiently with our intelligent platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                <button
                  className="px-10 py-5 text-xl font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all transform hover:scale-105 shadow-lg"
                  onClick={() => navigate("/signin")}
                >
                  Get Started Now
                </button>
                <button
                  className="px-10 py-5 text-xl font-semibold bg-white border-2 border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 transition-all"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up Free
                </button>
              </div>

              {/* Trust Indicators - Enhanced */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 sm:gap-12 pt-4">
                <div className="text-center px-4">
                  <div className="text-4xl sm:text-5xl font-bold text-sky-700">10k+</div>
                  <div className="text-base sm:text-lg text-gray-600 mt-1">Active Users</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-4xl sm:text-5xl font-bold text-sky-700">5k+</div>
                  <div className="text-base sm:text-lg text-gray-600 mt-1">Verified Helpers</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-4xl sm:text-5xl font-bold text-sky-700">4.9★</div>
                  <div className="text-base sm:text-lg text-gray-600 mt-1">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Image - Larger & Enhanced */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl opacity-20 blur-2xl"></div>
              <div className="relative h-[450px] md:h-[550px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl">
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
        <section className="relative z-10 py-24 md:py-32 bg-white" id="features">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-20 text-black">
              Why Choose Helper Hub?
            </h2>

            <div className="grid md:grid-cols-3 gap-12 place-items-center">
              <div className="w-80 h-72 bg-white border border-black/20 shadow-lg rounded-lg flex flex-col items-center justify-center p-8 hover:shadow-2xl transition-shadow hover:scale-105 transform duration-300">
                <Clock className="text-gray-800 mb-5 w-20 h-20" />
                <h3 className="text-2xl font-semibold mb-3">Quick Matching</h3>
                <p className="text-lg text-gray-700 text-center">
                  Find the right helper in minutes
                </p>
              </div>

              <div className="w-80 h-72 bg-white border border-black/20 shadow-lg rounded-lg flex flex-col items-center justify-center p-8 hover:shadow-2xl transition-shadow hover:scale-105 transform duration-300">
                <Star className="text-gray-800 mb-5 w-20 h-20" />
                <h3 className="text-2xl font-semibold mb-3">Top Rated</h3>
                <p className="text-lg text-gray-700 text-center">
                  Verified professionals with great reviews
                </p>
              </div>

              <div className="w-80 h-72 bg-white border border-black/20 shadow-lg rounded-lg flex flex-col items-center justify-center p-8 hover:shadow-2xl transition-shadow hover:scale-105 transform duration-300">
                <Shield className="text-gray-800 mb-5 w-20 h-20" />
                <h3 className="text-2xl font-semibold mb-3">Secure & Safe</h3>
                <p className="text-lg text-gray-700 text-center">
                  Protected payments and verified identities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative z-10 py-24 md:py-32 bg-sky-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-16 sm:mb-20 md:mb-24 text-black">
              Our Services
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
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
                  className="bg-white p-10 sm:p-12 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all hover:scale-105 transform duration-300"
                >
                  <h3 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-5 text-sky-700">
                    {service.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-700">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative z-10 py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16 md:mb-20">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
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
                  className="border-2 border-gray-200 rounded-xl p-8 bg-gray-50 hover:bg-sky-50 hover:border-sky-300 transition-all shadow-md hover:shadow-xl"
                >
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-sky-700">{faq.q}</h3>
                  <p className="text-lg md:text-xl text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-gradient-to-r from-sky-600 to-sky-800 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-center md:text-left text-white/90 text-lg sm:text-xl order-2 md:order-1">
                © 2025 HelperHub. All rights reserved.
              </p>

              <div className="flex gap-6 sm:gap-8 order-3 md:order-2">
                <button className="hover:underline text-lg sm:text-xl bg-transparent border-0 cursor-pointer text-white hover:text-white/80 transition-colors">
                  Privacy Policy
                </button>
                <button className="hover:underline text-lg sm:text-xl bg-transparent border-0 cursor-pointer text-white hover:text-white/80 transition-colors">
                  Terms
                </button>
                <button className="hover:underline text-lg sm:text-xl bg-transparent border-0 cursor-pointer text-white hover:text-white/80 transition-colors">
                  Contact
                </button>
              </div>
              
              {/* Logo */}
              <div className="flex items-center gap-3 sm:gap-4 order-1 md:order-3 mb-4 md:mb-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-xl flex items-center justify-center">
                  <FaHandshakeAngle className="w-8 h-7 sm:w-10 sm:h-9 text-white" />
                </div>
                <h1 className="text-[42px] sm:text-[48px] font-bold text-white font-inter mr-0 flex">
                  Hire
                  <h3 className="text-[32px] sm:text-[36px] mt-6 sm:mt-7">Helper</h3>
                </h1>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}