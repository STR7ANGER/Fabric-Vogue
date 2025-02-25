import React from "react";
import { assets } from "../assets/assets.js";

const Hero = () => {
  return (
    <div className="flex flex-col mt-28 sm:flex-row rounded-xl overflow-hidden shadow-xl">
      {/*Hero Left Side*/}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-16 lg:py-20 px-8 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
        <div className="">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500"></div>
            <p className="font-medium text-sm md:text-base tracking-wider">
              OUR BESTSELLERS
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl leading-relaxed mb-4 font-bold">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Arrivals
            </span>
          </h1>
          <div className="flex items-center gap-3 group cursor-pointer mt-4 transition-all duration-300 hover:translate-x-2">
            <p className="font-semibold text-sm md:text-base tracking-wider">
              {" "}
              SHOP NOW
            </p>
            <div className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-16"></div>
          </div>
        </div>
      </div>
      {/*Hero Right Side*/}
      <div className="w-full sm:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent z-10"></div>
        <img
          className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-110"
          src={assets.hero_img}
          alt="Latest fashion arrivals"
        />
      </div>
    </div>
  );
};

export default Hero;
