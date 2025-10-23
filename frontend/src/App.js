import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feed from './Components/Feed';
import SignUpPage from './Components/signup';
import LoginPage from './Components/login';
import Dashboard from './Components/Dashboard';
import MyTask from './Components/MyTask';
import PostNewTask from './Components/PostNewTask';
import Request from './Components/RequestPage'; 
import MyRequests from './Components/MyRequest';
import Hero from './Components/Hero';
import SettingsPage from './Components/SettingsPage';
import Profile from './Components/Profile';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedPage" element={<Feed />} />
          <Route path="/mytasks" element={<MyTask />} />
          <Route path="/posttask" element={<PostNewTask />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/myrequests" element={<MyRequests />} /> 
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/" element={<Hero />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
