import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import MainPage from './components/MainPage.jsx';
import Features from './components/Features.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MainPage />
      <Features/>
    </div>
  );
}

export default App;