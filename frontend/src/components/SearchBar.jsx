import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (showSearch) {
      nav("/collection");
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [showSearch]);

  return showSearch && visible ? (
    <div className="border-t border-b mt-20 bg-gradient-to-r from-purple-900/5 via-indigo-800/5 to-blue-900/5 text-center backdrop-blur-sm shadow-md">
      <div className="inline-flex items-center justify-center border border-purple-500/30 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white/80 backdrop-blur-sm shadow-sm focus-within:shadow-lg focus-within:border-purple-500/50 transition-all duration-300">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm text-gray-700"
          type="text"
          placeholder="Search for products..."
        />
        <img
          className="w-4 brightness-0 opacity-60"
          src={assets.search_icon}
          alt="Search Icon"
        />
      </div>
      <div className="inline-flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-200/80 transition-colors duration-200 cursor-pointer">
        <img
          onClick={() => setShowSearch(false)}
          className="w-3 opacity-60"
          src={assets.cross_icon}
          alt="Close Icon"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
