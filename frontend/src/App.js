import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feed from './components/Feed';
import SignUpPage from './components/signup';
import LoginPage from './components/login';
import Dashboard from './components/Dashboard';
import MyTask from './components/MyTask';
import PostNewTask from './components/PostNewTask';
import Request from './components/RequestPage'; 
import MyRequests from './components/MyRequest';
import VerifyOtp from "./components/VerifyOtp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedPage" element={<Feed />} />
          <Route path="/mytasks" element={<MyTask />} />
          <Route path="/posttask" element={<PostNewTask />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/myrequests" element={<MyRequests />} /> 
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
