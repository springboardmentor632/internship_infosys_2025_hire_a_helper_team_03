import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Feed from './Components/Feed';
import SignUpPage from './Components/signup';
import LoginPage from './Components/login';
import Dashboard from './Components/Dashboard';
import MyTask from './Components/MyTask';
import PostNewTask from './Components/PostNewTask';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedPage" element={<Feed />} />
          <Route path="/mytasks" element={<MyTask />} />
          <Route path="/posttask" element={<PostNewTask />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
