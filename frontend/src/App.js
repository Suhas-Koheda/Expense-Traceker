import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import { Link } from 'react-router-dom';
import MainPage from './components/MainPage.jsx';
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MainPage />
    </div>
  );
}

export default App;