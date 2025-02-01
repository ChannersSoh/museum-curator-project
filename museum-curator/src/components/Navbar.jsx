import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 w-full bg-gray-800 text-white z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-semibold">Museum Curator</div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
