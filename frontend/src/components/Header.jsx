// src/components/Header.js (rename from Header.jsx)
import React from 'react';

const Header = () => {
  return (
    <div>
      <nav className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">EQUI</h1>
        <div className="flex gap-4">
          <button className="text-gray-600 hover:text-gray-900">Login</button>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;