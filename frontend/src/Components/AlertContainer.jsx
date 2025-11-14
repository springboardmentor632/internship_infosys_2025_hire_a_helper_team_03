import React, { useState, useCallback, createContext, useContext } from 'react';
import CustomAlert from './CustomAlert';

// Create Alert Context
const AlertContext = createContext();

// Custom hook to use alerts
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

// Alert Provider Component
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const newAlert = {
      id,
      message,
      type,
      duration
    };

    setAlerts(prev => [...prev, newAlert]);

    // Auto-remove after duration (if duration is set)
    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }

    return id;
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  // Convenience methods
  const showSuccess = useCallback((message, duration) => {
    return showAlert(message, 'success', duration);
  }, [showAlert]);

  const showError = useCallback((message, duration) => {
    return showAlert(message, 'error', duration);
  }, [showAlert]);

  const showWarning = useCallback((message, duration) => {
    return showAlert(message, 'warning', duration);
  }, [showAlert]);

  const showInfo = useCallback((message, duration) => {
    return showAlert(message, 'info', duration);
  }, [showAlert]);

  const value = {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeAlert
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      
      {/* Render alerts */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        {alerts.map((alert, index) => (
          <CustomAlert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            duration={0} // We handle duration in parent
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
