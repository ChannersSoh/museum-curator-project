import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({ to, currentPath, children }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-lg transition duration-200 ${
        currentPath === to ? "text-blue-400" : "hover:text-gray-300"
      }`}
      aria-current={currentPath === to ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Museum Curator
        </Link>

        <div className="space-x-6">
          <NavLink to="/" currentPath={location.pathname}>
            Home
          </NavLink>
          <NavLink to="/exhibits" currentPath={location.pathname}>
            Exhibits
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
