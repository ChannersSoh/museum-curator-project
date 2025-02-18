import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

function NavLink({ to, currentPath, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 rounded-md text-lg transition-all duration-200 ease-in-out ${
        currentPath === to
          ? "text-blue-500 dark:text-blue-400 font-semibold bg-gray-800 dark:bg-gray-600"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white"
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 w-full bg-gray-900 dark:bg-gray-700 text-gray-100 dark:text-gray-100 shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide text-gray-100 dark:text-white">
          Museum Curator
        </Link>

        <button
          className="lg:hidden text-gray-100 dark:text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden lg:flex space-x-6 items-center">
          <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
          <NavLink to="/exhibits" currentPath={location.pathname}>Exhibits</NavLink>

          {token ? (
            <>
              <NavLink to="/collections" currentPath={location.pathname}>My Collections</NavLink>
              <span className="text-gray-400 dark:text-gray-400">Hello, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" currentPath={location.pathname}>Login</NavLink>
              <NavLink to="/register" currentPath={location.pathname}>Sign Up</NavLink>
            </>
          )}
        </div>

        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-14 right-6 w-48 bg-gray-800 dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-transform duration-200 lg:hidden"
          >
            <div className="flex flex-col">
              <NavLink to="/" currentPath={location.pathname} onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/exhibits" currentPath={location.pathname} onClick={() => setMenuOpen(false)}>
                Exhibits
              </NavLink>

              {token ? (
                <>
                  <NavLink to="/collections" currentPath={location.pathname} onClick={() => setMenuOpen(false)}>
                    My Collections
                  </NavLink>
                  <span className="text-gray-400 dark:text-gray-400 text-center py-2">
                    Hello, {user?.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" currentPath={location.pathname} onClick={() => setMenuOpen(false)}>
                    Login
                  </NavLink>
                  <NavLink to="/register" currentPath={location.pathname} onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
