import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

const CustomAlert = ({ 
  message, 
  type = 'info', // success, error, warning, info
  onClose, 
  duration = 5000,
  position = 'top-right' // top-right, top-left, top-center, bottom-right, bottom-left, bottom-center
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: <FaCheckCircle className="text-green-500" size={20} />,
          progressBar: 'bg-green-500'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: <FaTimesCircle className="text-red-500" size={20} />,
          progressBar: 'bg-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          icon: <FaExclamationCircle className="text-amber-500" size={20} />,
          progressBar: 'bg-amber-500'
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: <FaInfoCircle className="text-blue-500" size={20} />,
          progressBar: 'bg-blue-500'
        };
    }
  };

  const getPositionStyles = () => {
    const base = 'fixed z-50';
    switch (position) {
      case 'top-left':
        return `${base} top-4 left-4`;
      case 'top-center':
        return `${base} top-4 left-1/2 transform -translate-x-1/2`;
      case 'top-right':
      default:
        return `${base} top-4 right-4`;
      case 'bottom-left':
        return `${base} bottom-4 left-4`;
      case 'bottom-center':
        return `${base} bottom-4 left-1/2 transform -translate-x-1/2`;
      case 'bottom-right':
        return `${base} bottom-4 right-4`;
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`${getPositionStyles()} animate-slide-in`}>
      <div 
        className={`${styles.bg} ${styles.border} ${styles.text} border rounded-lg shadow-lg p-4 pr-12 min-w-[300px] max-w-md relative overflow-hidden`}
      >
        {/* Alert Content */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {styles.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 ${styles.text} opacity-60 hover:opacity-100 transition-opacity`}
          aria-label="Close"
        >
          <FaTimes size={14} />
        </button>

        {/* Progress Bar */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className={`h-full ${styles.progressBar} transition-all`}
              style={{
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CustomAlert;
