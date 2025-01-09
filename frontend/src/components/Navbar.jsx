import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, cartItems, calculateOrderDetails } =
    useContext(ShopContext);

  // Get cart count from order details for consistency
  const getCartCount = () => {
    const { itemCount } = calculateOrderDetails(cartItems);
    return itemCount;
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Shop Logo" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? "text-black" : ""}`
          }
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? "text-black" : ""}`
          }
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? "text-black" : ""}`
          }
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? "text-black" : ""}`
          }
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
      </ul>

      {/* Right Icons Section */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => setShowSearch(true)}
          className="focus:outline-none"
          aria-label="Search"
        >
          <img
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
        </button>

        {/* Profile Dropdown */}
        <div className="group relative">
          <button className="focus:outline-none">
            <Link to='/login'>
              <img
                className="w-5 cursor-pointer"
                src={assets.profile_icon}
                alt="Profile"
              />
            </Link>
          </button>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
              <button className="text-left cursor-pointer hover:text-black transition-colors">
                My Profile
              </button>
              <button className="text-left cursor-pointer hover:text-black transition-colors">
                Orders
              </button>

              <button className="text-left cursor-pointer hover:text-black transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Cart Link */}
        <Link
          to="/cart"
          className="relative"
          aria-label={`Cart with ${getCartCount()} items`}
        >
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setVisible(true)}
          className="focus:outline-none sm:hidden"
          aria-label="Menu"
        >
          <img
            src={assets.menu_icon}
            className="w-5 cursor-pointer"
            alt="Menu"
          />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-64 bg-white transition-transform ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-4 cursor-pointer border-b"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt=""
              />
              <p>Back</p>
            </div>

            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 px-6 border-b ${isActive ? "bg-gray-100" : ""}`
              }
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 px-6 border-b ${isActive ? "bg-gray-100" : ""}`
              }
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 px-6 border-b ${isActive ? "bg-gray-100" : ""}`
              }
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 px-6 border-b ${isActive ? "bg-gray-100" : ""}`
              }
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
