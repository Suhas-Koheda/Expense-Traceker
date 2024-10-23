import React from 'react';
import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (  
    <Router> 
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signu" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
