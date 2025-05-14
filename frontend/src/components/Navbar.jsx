"use client";

import { Book, Crown, LogIn, LogOut, Menu, User } from "lucide-react"; // Import icons
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function Navbar() {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-pink-400 transition-colors duration-200">
            BookStore
          </Link>

          {/* Mobile menu button - for responsive design */}
          <div className="md:hidden">
            <button className="text-white hover:text-pink-400 focus:outline-none">
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-1">
            {/* Books Link */}
            <li className="flex gap-x-2 items-center">
              <Link
                to="/books"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-pink-400 transition-colors duration-200 flex items-center"
              >
                <Book size={18} className="mr-1" />
                Books
              </Link>
              <Link
                to="/free-books"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-pink-400 transition-colors duration-200 flex items-center"
              >
                <Book size={18} className="mr-1" />
                Free Books
              </Link>
            </li>

            {/* Authentication Links */}
            {!user ? (
              <>
                <li>
                  <Link
                    to="/signin"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-pink-400 transition-colors duration-200 flex items-center"
                  >
                    <LogIn size={18} className="mr-1" />
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-pink-400 transition-colors duration-200 flex items-center"
                  >
                    <User size={18} className="mr-1" />
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium flex items-center">
                  <User size={16} className="mr-1" />
                  Hi, {user.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    history.push("/");
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium flex items-center"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </button>
              </li>
            )}

            {/* Subscribe Button */}
            <li>
              <Link
                to="/subscription"
                className="ml-2 px-4 py-2 rounded-md bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors duration-200 shadow-sm"
              >
                Subscribe
              </Link>
            </li>

            {/* Dashboard Links */}
            {user?.isAdmin ? (
              <li className="flex space-x-2 ml-2">
                <Link
                  to="/admin/dashboard"
                  className="px-3 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-600 transition-colors duration-200 shadow-sm flex items-center"
                >
                  <Crown size={16} className="mr-1" />
                  Admin
                </Link>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-600 transition-colors duration-200 shadow-sm"
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              user && (
                <li className="ml-2">
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-600 transition-colors duration-200 shadow-sm"
                  >
                    Dashboard
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      {/* This would be toggled with state in a real implementation */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/books" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
            Books
          </Link>

          {!user ? (
            <>
              <Link
                to="/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="px-3 py-2">
              <span className="block px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium mb-2">
                Hi, {user.name}
              </span>
              <button
                onClick={() => {
                  logout();
                  history.push("/");
                }}
                className="w-full text-left px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}

          <Link
            to="/subscription"
            className="block px-3 py-2 rounded-md text-base font-medium bg-pink-500 text-white hover:bg-pink-600"
          >
            Subscribe
          </Link>

          {user?.isAdmin ? (
            <>
              <Link
                to="/admin/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium bg-gray-700 text-white hover:bg-gray-600"
              >
                Admin Dashboard
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium bg-gray-700 text-white hover:bg-gray-600"
              >
                User Dashboard
              </Link>
            </>
          ) : (
            user && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium bg-gray-700 text-white hover:bg-gray-600"
              >
                User Dashboard
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
