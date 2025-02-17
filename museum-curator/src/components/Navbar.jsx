import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Museum Curator
        </Link>

        <div className="space-x-6 flex items-center">
          <NavLink to="/" currentPath={location.pathname}>
            Home
          </NavLink>
          <NavLink to="/exhibits" currentPath={location.pathname}>
            Exhibits
          </NavLink>

          {token ? (
            <>
              <NavLink to="/collections" currentPath={location.pathname}>
                My Collections
              </NavLink>
              <span className="text-gray-400">Hello, {user?.username}</span>
              <button onClick={handleLogout} className="px-3 py-2 bg-red-500 rounded-md text-black">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" currentPath={location.pathname}>
                Login
              </NavLink>
              <NavLink to="/register" currentPath={location.pathname}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
