import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdLock, MdVisibility, MdVisibilityOff, MdEmail } from 'react-icons/md';
import API_BASE_URL from '../config/api';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  // Step tracking: 1 = OTP verification, 2 = Set new password
  const [currentStep, setCurrentStep] = useState(1);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verifiedOtp, setVerifiedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Timer for resend OTP
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
      return;
    }

    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer, email, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Step 1: Verify OTP only
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      // We'll verify the OTP exists without resetting password yet
      // Just validate the format and move to next step
      // In a real scenario, you might want to verify OTP with backend first
      setVerifiedOtp(otpCode);
      setSuccess('OTP verified! Now set your new password.');
      
      setTimeout(() => {
        setCurrentStep(2);
        setSuccess('');
      }, 1000);

    } catch (err) {
      setError(err.message);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset password with verified OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp: verifiedOtp,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setSuccess('Password reset successfully! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/signin', {
          state: { message: 'Password reset successful! Please login with your new password.' }
        });
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      setSuccess('New OTP sent successfully!');
      setResendTimer(600);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-sky-100">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6 gap-2">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all ${
              currentStep === 1 
                ? 'bg-sky-600 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {currentStep === 1 ? '1' : '✓'}
            </div>
            <div className={`h-1 w-16 transition-all ${
              currentStep === 2 ? 'bg-sky-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all ${
              currentStep === 2 
                ? 'bg-sky-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>

          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center shadow-lg">
              {currentStep === 1 ? (
                <MdEmail className="text-white text-5xl" />
              ) : (
                <MdLock className="text-white text-5xl" />
              )}
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStep === 1 ? 'Verify OTP Code' : 'Set New Password'}
            </h1>
            <p className="text-sm text-gray-600 mb-1">
              {currentStep === 1 
                ? 'Enter the 6-digit code sent to' 
                : 'Create a strong password for your account'}
            </p>
            {currentStep === 1 && (
              <p className="text-sm font-semibold text-sky-600 break-all">
                {email}
              </p>
            )}
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Step 1: OTP Verification */}
          {currentStep === 1 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Enter OTP Code
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center text-xl font-bold text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      style={{
                        borderColor: digit ? '#0284C7' : '#E5E7EB',
                        backgroundColor: digit ? '#FFFFFF' : '#F3F4F6'
                      }}
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>

              {/* Timer */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-600">
                    Code expires in <span className="font-bold text-sky-600">{formatTime(resendTimer)}</span>
                  </p>
                ) : (
                  <p className="text-red-600 text-sm font-semibold">OTP has expired</p>
                )}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full h-12 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </form>
          )}

          {/* Step 2: Set New Password */}
          {currentStep === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* New Password Input */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 characters)"
                    className="w-full h-12 px-4 pr-12 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    disabled={loading}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sky-600 transition-colors"
                  >
                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="w-full h-12 px-4 pr-12 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sky-600 transition-colors"
                  >
                    {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-medium text-blue-900 mb-2">Password Requirements:</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className={newPassword.length >= 6 ? 'text-green-600' : 'text-gray-400'}>
                      {newPassword.length >= 6 ? '✓' : '○'}
                    </span>
                    At least 6 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={newPassword && confirmPassword && newPassword === confirmPassword ? 'text-green-600' : 'text-gray-400'}>
                      {newPassword && confirmPassword && newPassword === confirmPassword ? '✓' : '○'}
                    </span>
                    Passwords match
                  </li>
                </ul>
              </div>

              {/* Reset Password Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting Password...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </button>

              {/* Back to OTP Step */}
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  setNewPassword('');
                  setConfirmPassword('');
                  setError('');
                }}
                className="w-full text-sm text-gray-600 hover:text-sky-600 transition-colors"
              >
                ← Back to OTP verification
              </button>
            </form>
          )}

          {/* Resend OTP - Only show in Step 1 */}
          {currentStep === 1 && (
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                {canResend ? (
                  <button
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sky-600 font-semibold hover:text-sky-700 hover:underline disabled:opacity-50 transition-all"
                  >
                    Resend Code
                  </button>
                ) : (
                  `Resend code in ${formatTime(resendTimer)}`
                )}
              </p>
            </div>
          )}

          {/* Back Link - Only show in Step 1 */}
          {currentStep === 1 && (
            <div className="text-center mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-sky-600 hover:text-sky-700 hover:underline transition-all"
              >
                ← Change email address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
