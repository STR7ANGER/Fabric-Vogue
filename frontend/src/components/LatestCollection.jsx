import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="relative my-20 px-6">
      {/* Main section background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-indigo-800/5 to-blue-900/5 rounded-2xl -m-4"></div>

      {/* Background decorative elements */}
      <div className="absolute -left-16 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -right-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-1/3 top-0 w-64 h-64 bg-gradient-to-b from-pink-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>

      {/* Content container */}
      <div className="relative">
        {/* Title section with gradients */}
        <div className="text-center py-12 max-w-3xl mx-auto">
          <div className="relative mb-6">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 tracking-widest">
              NEW ARRIVALS
            </span>
            <div className="relative inline-block">
              <Title text1={"LATEST"} text2={"COLLECTIONS"} />
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900"></div>
            </div>
          </div>
          <p className="w-3/4 m-auto text-sm md:text-base text-gray-600 leading-relaxed">
            Discover our newest arrivals designed to elevate your style with
            premium quality and timeless elegance.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
          {latestProducts.map((item, index) => (
            <div
              key={index}
              className="group relative transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              {/* New arrival badge */}
              {index < 5 && (
                <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white text-xs py-1 px-3 rounded-full shadow-lg shadow-purple-900/20">
                  New
                </div>
              )}

              {/* Hover effect glow matching navbar gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-indigo-800/5 to-blue-900/5 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />

              {/* Price tag with gradient */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-md">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800 font-semibold">
                    ${item.price}
                  </span>
                </div>
              </div>

              {/* Quick shop button with navbar gradient */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300">
                <button className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white text-xs font-medium py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-900/30 hover:shadow-xl">
                  Quick Shop
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View all button with navbar gradient */}
        <div className="text-center mt-14">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white rounded-full font-medium tracking-wide shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 hover:-translate-y-1">
            View All Collections
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
