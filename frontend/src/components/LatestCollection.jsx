import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="relative mt-20 mb-20 backdrop-blur-sm rounded-xl border border-purple-900/20 shadow-xl shadow-purple-900/10 px-6 py-10">
      {/* Main section background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-purple-950/80 to-indigo-950/80 rounded-xl"></div>

      {/* Background decorative elements */}
      <div className="absolute -left-16 top-1/4 w-80 h-80 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -right-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-1/3 top-0 w-64 h-64 bg-gradient-to-b from-fuchsia-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Title section with gradients */}
        <div className="text-center py-8 max-w-3xl mx-auto">
          <div className="relative mb-6">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 tracking-widest">
              NEW ARRIVALS
            </span>
            <div className="relative inline-block">
              <Title text1="LATEST" text2="COLLECTIONS" />
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800"></div>
            </div>
          </div>
          <p className="w-3/4 m-auto text-sm md:text-base text-gray-300 leading-relaxed">
            Discover our newest arrivals designed to elevate your style with
            premium quality and timeless elegance.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
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
                <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white text-xs py-1 px-3 rounded-full shadow-lg shadow-purple-900/20">
                  New
                </div>
              )}

              {/* Hover effect glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-fuchsia-900/10 to-indigo-900/10 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />

              {/* Price tag with gradient */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded shadow-md">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-semibold">
                    ${item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-14">
          <Link
            to="/collection"
            className="px-8 py-3 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white rounded-full font-medium tracking-wide shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 hover:-translate-y-1"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
