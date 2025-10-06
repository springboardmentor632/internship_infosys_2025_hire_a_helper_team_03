import React, { useState } from 'react';
import './App.css';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Account created successfully!');
  };

  return (
    <div className="page-container">
      <div className="main-card">
        {/* Left Section: Create Account Form */}
        <div className="form-section">
          <div>
            <h2 className="title">Create Account</h2>
            <p className="subtitle">Join the HireHelper community</p>
          </div>

          <form className="form-content" onSubmit={handleSubmit}>
            {/* First Name & Last Name */}
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* Email Address */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="input-field full-width"
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="input-field full-width"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field full-width"
            />

            {/* Terms & Conditions Checkbox */}
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I agree to <span className="link">Terms & Conditions</span>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>
        </div>

        {/* Right Section: Welcome Illustration */}
        <div className="welcome-section">
          <div>
            <h2 className="welcome-text">Welcome to</h2>
            <h2 className="brand-text">HireHelper</h2>
          </div>
          <p className="welcome-subtitle">Signup for your account</p>

          {/* Illustration Section */}
          <div className="illustration-container">
            <img
              src="/Illustration.png"
              alt="Sign up illustration for HireHelper"
              className="illustration-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
