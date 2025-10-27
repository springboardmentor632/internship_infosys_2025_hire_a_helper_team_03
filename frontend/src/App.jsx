import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Feed from './Pages/Feed';
import MyTask from './Pages/MyTask';
import PostNewTask from './Pages/PostNewTask';
import SignUpPage from './Pages/signup';
import LoginPage from './Pages/login';
import Home from './Pages/Home';  
import MyRequest from './Pages/MyRequest';
import Requests from './Pages/RequestPage';
import Settings from './Pages/SettingsPage';
import Notifications from './Pages/NotificationsPage';

// Pages


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedPage" element={<Feed />} />
          <Route path="/mytasks" element={<MyTask />} />
          <Route path="/posttask" element={<PostNewTask />} />
          <Route path="/myrequests" element={<MyRequest />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;