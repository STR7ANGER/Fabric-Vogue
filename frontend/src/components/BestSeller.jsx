import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="relative mt-20 mb-20 backdrop-blur-sm rounded-xl border border-purple-900/20 shadow-xl shadow-purple-900/10 px-6 py-10">
      {/* Main section background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-gray-900/80 rounded-xl"></div>

      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-1/3 top-0 w-64 h-64 bg-gradient-to-b from-fuchsia-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Title section with gradients */}
        <div className="text-center py-8 max-w-3xl mx-auto">
          <div className="relative mb-6">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-violet-500 tracking-widest">
              CUSTOMER FAVORITES
            </span>
            <div className="relative inline-block">
              <Title text1="BEST" text2="SELLERS" />
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-800 via-violet-800 to-indigo-800"></div>
            </div>
          </div>
          <p className="w-3/4 m-auto text-sm md:text-base text-gray-300 leading-relaxed">
            Our most coveted pieces loved for their exceptional quality,
            timeless design, and unmatched comfort.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
          {bestSeller.map((item, index) => (
            <div
              key={index}
              className="group relative transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              {/* Bestseller badge */}
              <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-fuchsia-800 via-violet-800 to-indigo-800 text-white text-xs py-1 px-3 rounded-full shadow-lg shadow-purple-900/20">
                Bestseller
              </div>

              {/* Hover effect glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/10 via-violet-900/10 to-indigo-900/10 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />

              {/* Price tag with gradient */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded shadow-md">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400 font-semibold">
                    ${item.price}
                  </span>
                </div>
              </div>

              {/* Quick shop button */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300">
                <button className="bg-gradient-to-r from-fuchsia-800 via-violet-800 to-indigo-800 text-white text-xs font-medium py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-900/30 hover:shadow-xl">
                  Quick Shop
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
