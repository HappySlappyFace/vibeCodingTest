"use client";

import Link from "next/link";
import { useState } from "react";

// This will be replaced with actual auth logic
const useAuth = () => {
  // Mock implementation
  return { isAuthenticated: false, user: null, userRole: null };
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, userRole } = useAuth();

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-bold text-xl">
                SuperAiPadel
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/terrains"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Courts
              </Link>
              <Link
                href="/pricing"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={isMenuOpen ? "sm:hidden block" : "sm:hidden hidden"}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/terrains"
            className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
          >
            Courts
          </Link>
          <Link
            href="/pricing"
            className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              <button className="w-full text-left text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
