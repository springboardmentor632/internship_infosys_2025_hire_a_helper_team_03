import React, { useState, useEffect } from "react";
import { Menu, X, Clock, Star, Shield } from "lucide-react";
import heroPageImage from "../Assets/heroPageImage.png";
import { FaHandshakeAngle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token');
    
    if (isLoggedIn && token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Outer Container */}
      <div className="relative w-full bg-white border-2 border-gray-300 rounded-lg min-h-screen overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-indigo-50 pointer-events-none z-0"></div>

        {/* Navigation Bar */}
        <nav className="relative z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center">
                  <FaHandshakeAngle className="w-7 h-6 text-white" />
                </div>
                <h1 className="text-[40px] font-bold text-sky-600 font-inter mr-0 flex">
                  Hire
                  <h3 className="text-[29px] mt-6">Helper</h3>
                </h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex gap-12 items-center">
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
              </div>

              {/* Buttons */}
              <div className="hidden md:flex gap-3">
                <button
                  className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
                <button
                  className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg"
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
              <div className="flex flex-col gap-4 pb-4">
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

        {/* Hero Section */}
        <section className="relative z-10 py-20" id="about">
          <div className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
            {/* Left Text */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-sky-700">
                Hire Smarter, Faster With
              </h1>
              <h2 className="text-3xl font-bold text-sky-700">
                Our Helper Hub Platform
              </h2>
              <p className="text-lg text-gray-800">
                Connect with trusted professionals instantly. Complete tasks
                efficiently with our intelligent platform.
              </p>
              <button
                className="px-6 py-3 bg-sky-600 text-white font-semibold text-lg rounded-lg"
                onClick={() => navigate("/signin")}
              >
                Get Started Now
              </button>
            </div>

            {/* Image */}
            <div className="relative h-96 rounded-xl flex items-center justify-center">
              <img
                src={heroPageImage}
                alt="Work discussion"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="relative z-10 py-20 bg-white" id="features">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <h2 className="text-3xl font-semibold text-center mb-16 text-black">
              Why Choose Helper Hub?
            </h2>

            <div className="grid md:grid-cols-3 gap-10 place-items-center">
              <div className="w-64 h-52 bg-white border border-black/20 shadow-md rounded-md flex flex-col items-center justify-center p-6">
                <Clock className="text-gray-800 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Quick Matching</h3>
                <p className="text-gray-700 text-center">
                  Find the right helper in minutes
                </p>
              </div>

              <div className="w-64 h-52 bg-white border border-black/20 shadow-md rounded-md flex flex-col items-center justify-center p-6">
                <Star className="text-gray-800 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Top Rated</h3>
                <p className="text-gray-700 text-center">
                  Verified professionals with great reviews
                </p>
              </div>

              <div className="w-64 h-52 bg-white border border-black/20 shadow-md rounded-md flex flex-col items-center justify-center p-6">
                <Shield className="text-gray-800 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
                <p className="text-gray-700 text-center">
                  Protected payments and verified identities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative z-10 py-20 bg-sky-50">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <h2 className="text-3xl font-semibold text-center mb-16 text-black">
              Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
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
                  className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
                >
                  <h3 className="text-2xl font-semibold mb-3 text-sky-700">
                    {service.title}
                  </h3>
                  <p className="text-gray-700">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative z-10 py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-0">
            <h2 className="text-3xl font-semibold text-center mb-12">
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
                  className="border border-gray-200 rounded-lg p-5 bg-gray-50"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-gradient-to-r from-sky-600 to-sky-800 text-white py-10">
          <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-center md:text-left text-white/90">
              © 2025 HelperHub. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </div>
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center">
                <FaHandshakeAngle className="w-7 h-6 text-white" />
              </div>
              <h1 className="text-[40px] font-bold text-white font-inter mr-0 flex">
                Hire
                <h3 className="text-[29px] mt-6">Helper</h3>
              </h1>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
