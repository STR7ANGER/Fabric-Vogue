import React from "react";
import Title from "./../components/Title";

const About = () => {
  return (
    <div className="relative my-20 px-6">
      {/* Main section background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-purple-950/80 to-indigo-950/80 rounded-xl -m-4"></div>

      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-1/3 top-0 w-64 h-64 bg-gradient-to-b from-fuchsia-500/10 to-violet-500/10 rounded-full blur-3xl -z-10"></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Title section with gradients */}
        <div className="text-center py-12 max-w-3xl mx-auto">
          <div className="relative mb-6">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 tracking-widest">
              OUR STORY
            </span>
            <div className="relative inline-block">
              <Title text1="ABOUT" text2="US" />
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800"></div>
            </div>
          </div>
          <p className="w-3/4 m-auto text-sm md:text-base text-gray-300 leading-relaxed">
            Creating exceptional fashion with passion, quality and purpose since
            2010.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* About content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
          {/* Left column - Our mission */}
          <div className="group relative transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-fuchsia-900/10 to-indigo-900/10 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-purple-900/20">
              <div className="mb-4 inline-block">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  Our Mission
                </h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mt-1"></div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                We believe that fashion should be both beautiful and
                responsible. Our mission is to create timeless pieces that
                empower our customers to express their unique style while
                respecting our planet.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Each garment is thoughtfully designed with attention to detail,
                quality craftsmanship, and sustainable practices. We're
                committed to reducing our environmental footprint while
                maximizing our positive social impact.
              </p>
            </div>
          </div>

          {/* Right column - Our story */}
          <div className="group relative transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-fuchsia-900/10 to-indigo-900/10 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-purple-900/20">
              <div className="mb-4 inline-block">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  Our Story
                </h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mt-1"></div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Founded in 2010 by a team of passionate designers, our journey
                began with a simple idea: create beautiful clothing that stands
                the test of time, both in durability and style.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Over the years, we've grown from a small boutique to an
                internationally recognized brand, but our core values remain
                unchanged. Every piece in our collection tells a story of
                craftsmanship, quality materials, and ethical production.
              </p>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Our Values
            </h3>
            <div className="h-0.5 w-16 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mt-1 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value card 1 */}
            <div className="group relative transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-fuchsia-900/10 to-indigo-900/10 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-900/20">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-700 via-fuchsia-700 to-indigo-700 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-900/30">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  Quality First
                </h4>
                <p className="text-gray-300 text-sm">
                  We never compromise on quality. From fabric selection to final
                  stitch, excellence is our standard.
                </p>
              </div>
            </div>

            {/* Value card 2 */}
            <div className="group relative transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-fuchsia-900/10 to-indigo-900/10 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-900/20">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-700 via-fuchsia-700 to-indigo-700 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-900/30">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  Sustainability
                </h4>
                <p className="text-gray-300 text-sm">
                  Our commitment to the planet means ethical sourcing, reduced
                  waste, and eco-friendly production methods.
                </p>
              </div>
            </div>

            {/* Value card 3 */}
            <div className="group relative transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-fuchsia-900/10 to-indigo-900/10 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-900/20">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-700 via-fuchsia-700 to-indigo-700 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-900/30">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  Customer Focus
                </h4>
                <p className="text-gray-300 text-sm">
                  Your satisfaction drives everything we do. We listen, adapt,
                  and strive to exceed your expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
