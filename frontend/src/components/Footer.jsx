import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="relative mt-5  bg-gradient-to-b from-indigo-50/30 via-purple-50/40 to-indigo-100/50 pt-20 pb-6 w-full overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute -left-16 top-20 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-tl from-pink-500/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-gradient-to-tr from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>

      {/* Diagonal gradient line at the top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-16">
          <div>
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-lg blur-md"></div>
              <img
                src={assets.logo}
                className="w-36 relative"
                alt="Company Logo"
              />
            </div>
            <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
              Dedicated to bringing you the finest quality products with
              exceptional service. Our commitment is to offer a seamless
              shopping experience that reflects our values of elegance,
              sustainability, and customer satisfaction.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#social"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-800 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#social"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-800 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#social"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-800 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <p className="text-xl font-medium mb-5 relative inline-block">
              COMPANY
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"></span>
            </p>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li>
                <a
                  href="#home"
                  className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></span>
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#delivery"
                  className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></span>
                  Delivery
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></span>
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium mb-5 relative inline-block">
              GET IN TOUCH
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"></span>
            </p>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="flex items-center gap-2 group">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700/20 via-indigo-700/20 to-purple-800/20 flex items-center justify-center group-hover:from-purple-700/30 group-hover:via-indigo-700/30 group-hover:to-purple-800/30 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                +1-212-456-7890
              </li>
              <li className="flex items-center gap-2 group">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700/20 via-indigo-700/20 to-purple-800/20 flex items-center justify-center group-hover:from-purple-700/30 group-hover:via-indigo-700/30 group-hover:to-purple-800/30 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <a
                  href="mailto:contact@fnv.com"
                  className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200"
                >
                  contact@fnv.com
                </a>
              </li>
              <li className="flex items-center gap-2 group mt-2">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700/20 via-indigo-700/20 to-purple-800/20 flex items-center justify-center group-hover:from-purple-700/30 group-hover:via-indigo-700/30 group-hover:to-purple-800/30 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                123 Fashion Street, NY 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-full relative">
          {/* Gradient separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

          <div className="py-5 text-sm text-center text-gray-500 flex flex-col sm:flex-row justify-between items-center">
            <p>Copyright 2024 © fnv.com - All Rights Reserved</p>
            <div className="flex gap-4 mt-3 sm:mt-0">
              <a
                href="#terms"
                className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200"
              >
                Terms & Conditions
              </a>
              <span>|</span>
              <a
                href="#privacy"
                className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Bottom gradient bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
