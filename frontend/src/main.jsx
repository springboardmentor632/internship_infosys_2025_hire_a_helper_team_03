// src/main.jsx (Vite)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Assuming SignUpPage is rendered inside App
import './App.css'; // Make sure this is present if App.css holds global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
