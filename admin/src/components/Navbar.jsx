import React from "react";
import { assets } from "./../assets/assets.js";

const Navbar = ({ setToken }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 py-3 px-[4%]">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-slate-900 to-purple-900 shadow-lg shadow-purple-900/50"></div>

      {/* Content container */}
      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        <div className="relative z-10 group">
          <div className="relative">
            <div className="absolute  -inset-1 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 rounded-lg blur opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              className="w-[max(10%,80px)] ml-8 relative transition-all duration-300 group-hover:scale-105"
              src={assets.logo}
              alt="Company Logo"
            />
          </div>
        </div>

        <button
          onClick={() => setToken("")}
          className="relative z-10 px-6 py-2 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white rounded-full text-sm font-medium tracking-wide shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 hover:-translate-y-1"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
