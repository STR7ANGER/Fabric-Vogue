import React from "react";
import { assets } from "./../assets/assets";

const OurPolicy = () => {
  return (
    <div className="my-20 px-6">
      {/* Main gradient box container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/10 via-indigo-800/10 to-blue-900/10 py-16 px-6 shadow-xl">
        {/* Top left accent */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Bottom right accent */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-indigo-600/20 to-blue-600/20 rounded-full blur-3xl -z-10 transform translate-x-1/3 translate-y-1/3"></div>

        {/* Title section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 mb-3">
            Our Promises To You
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center">
            <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-white/50 hover:shadow-xl backdrop-blur-sm">
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-900/10 via-indigo-800/10 to-blue-900/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-16 h-16 mx-auto bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 rounded-full flex items-center justify-center">
                  <img
                    src={assets.exchange_icon}
                    className="w-8 transition-transform duration-300 group-hover:scale-110 brightness-200"
                    alt="Exchange policy"
                  />
                </div>
              </div>
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-lg mb-2">
                Easy Exchange Policy
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                We offer hassle-free exchange policy
              </p>
            </div>

            <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-white/50 hover:shadow-xl backdrop-blur-sm">
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-900/10 via-indigo-800/10 to-blue-900/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-16 h-16 mx-auto bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 rounded-full flex items-center justify-center">
                  <img
                    src={assets.quality_icon}
                    className="w-8 transition-transform duration-300 group-hover:scale-110 brightness-200"
                    alt="Return policy"
                  />
                </div>
              </div>
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-lg mb-2">
                7 Days Return Policy
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                We provide 7 days free return policy
              </p>
            </div>

            <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-white/50 hover:shadow-xl backdrop-blur-sm">
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-900/10 via-indigo-800/10 to-blue-900/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-16 h-16 mx-auto bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 rounded-full flex items-center justify-center">
                  <img
                    src={assets.support_img}
                    className="w-8 transition-transform duration-300 group-hover:scale-110 brightness-200"
                    alt="Customer support"
                  />
                </div>
              </div>
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-lg mb-2">
                Best Customer Support
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                We provide 24/7 customer support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
