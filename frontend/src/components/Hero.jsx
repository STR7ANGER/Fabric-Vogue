import React from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-purple-900/20 mt-20">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-16 lg:py-20 px-8 bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 text-white relative overflow-hidden">
        {/* Decorative Gradient Blobs */}
        <div className="absolute -left-16 top-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-16 bottom-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
            <p className="font-medium text-sm md:text-base tracking-wider text-gray-300">
              DISCOVER EXCLUSIVITY
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-relaxed mb-4 font-bold">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
              Arrivals
            </span>
          </h1>
          <p className="text-gray-300 mb-6 max-w-md">
            Elevate your style with our premium collection designed for those
            who appreciate sophistication and uniqueness.
          </p>
          <Link
            to="/collection"
            className="group inline-flex items-center gap-3 cursor-pointer mt-4 transition-all duration-300 hover:translate-x-2"
          >
            <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-700 to-fuchsia-700 text-white font-medium text-sm tracking-wider shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300">
              SHOP NOW
            </span>
            <div className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 group-hover:w-16"></div>
          </Link>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/30 z-10"></div>
        <img
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
          src={assets.hero_img}
          alt="Latest fashion arrivals"
        />
      </div>
    </div>
  );
};

export default Hero;
