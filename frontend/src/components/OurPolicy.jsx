import React from "react";
import { assets } from "./../assets/assets";

const OurPolicy = () => {
  return (
    <div className="mt-20 mb-20 px-6">
      {/* Main gradient box container */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900/60 via-purple-950/60 to-indigo-950/60 py-16 px-6 shadow-xl shadow-purple-900/20 border border-purple-900/20 backdrop-blur-sm">
        {/* Top left accent */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Bottom right accent */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-indigo-600/10 to-violet-600/10 rounded-full blur-3xl -z-10 transform translate-x-1/3 translate-y-1/3"></div>

        {/* Title section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 mb-3">
            Our Promises To You
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center">
            <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-white/5 hover:shadow-xl backdrop-blur-sm border border-purple-900/10 hover:border-purple-900/20">
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-violet-900/10 via-fuchsia-800/10 to-indigo-900/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-16 h-16 mx-auto bg-gradient-to-r from-violet-900 via-fuchsia-800 to-indigo-900 rounded-full flex items-center justify-center">
                  <img
                    src={assets.exchange_icon}
                    className="w-8 transition-transform duration-300 group-hover:scale-110 brightness-200"
                    alt="Exchange policy"
                  />
                </div>
              </div>
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 text-lg mb-2">
                Easy Exchange Policy
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                We offer hassle-free exchange policy
              </p>
            </div>

            <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-white/5 hover:shadow-xl backdrop-blur-sm border border-purple-900/10 hover:border-purple-900/20">
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-violet-900/10 via-fuchsia-800/10 to-indigo-900/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-16 h-16 mx-auto bg-gradient-to-r from-violet-900 via-fuchsia-800 to-indigo-900 rounded-full flex items-center justify-center">
                  <img
                    src={assets.quality_icon}
                    className="w-8 transition-transform duration-300 group-hover:scale-110 brightness-200"
                    alt="Return policy"
                  />
                </div>
              </div>
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 text-lg mb-2">
                7 Days Return Policy
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                We provide 7 days free return policy
              </p>
            </div>

            <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-white/5 hover:shadow-xl backdrop-blur-sm border border-purple-900/10 hover:border-purple-900/20">
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-violet-900/10 via-fuchsia-800/10 to-indigo-900/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-16 h-16 mx-auto bg-gradient-to-r from-violet-900 via-fuchsia-800 to-indigo-900 rounded-full flex items-center justify-center">
                  <img
                    src={assets.support_img}
                    className="w-8 transition-transform duration-300 group-hover:scale-110 brightness-200"
                    alt="Customer support"
                  />
                </div>
              </div>
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 text-lg mb-2">
                Best Customer Support
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
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
