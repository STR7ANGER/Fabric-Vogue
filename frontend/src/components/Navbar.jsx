import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const Name = localStorage.getItem("name");
    if (Name) {
      setName(Name);
    }

    // Add scroll listener for navbar effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    setShowSearch,
    cartItems,
    calculateOrderDetails,
    isLoggedIn,
    logout,
  } = useContext(ShopContext);

  // Get cart count from order details for consistency
  const getCartCount = () => {
    const { itemCount } = calculateOrderDetails(cartItems);
    return itemCount;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "py-3 shadow-md" : "py-6"
      }`}
    >
      {/* Light background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-white to-indigo-50"></div>

      {/* Content container */}
      <div className="relative w-full px-6 font-medium text-gray-700 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="relative z-10 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-200 to-indigo-200 rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              <img
                src={assets.logo}
                className="w-36 relative transition-all duration-300 group-hover:scale-105"
                alt="Shop Logo"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex gap-10 text-sm text-gray-500 relative z-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-500 hover:scale-105"
                }`
              }
            >
              <p>HOME</p>
              <div
                className={({ isActive }) =>
                  `h-[2px] bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`
                }
              ></div>
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-500 hover:scale-105"
                }`
              }
            >
              <p>COLLECTION</p>
              <div
                className={({ isActive }) =>
                  `h-[2px] bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`
                }
              ></div>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-500 hover:scale-105"
                }`
              }
            >
              <p>ABOUT</p>
              <div
                className={({ isActive }) =>
                  `h-[2px] bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`
                }
              ></div>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-500 hover:scale-105"
                }`
              }
            >
              <p>CONTACT</p>
              <div
                className={({ isActive }) =>
                  `h-[2px] bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`
                }
              ></div>
            </NavLink>
          </ul>

          {/* Right Icons Section */}
          <div className="flex items-center gap-8 relative z-10">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="focus:outline-none text-gray-500 hover:text-indigo-500 transition-all duration-300 hover:scale-110 relative after:absolute after:bg-indigo-100 after:w-0 after:h-0 after:rounded-full after:transition-all after:duration-300 hover:after:w-10 hover:after:h-10 after:-left-3 after:-top-3 after:-z-10 after:opacity-0 hover:after:opacity-100"
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
              {isLoggedIn ? (
                <button className="focus:outline-none text-gray-500 hover:text-indigo-500 transition-all duration-300 hover:scale-110 relative after:absolute after:bg-indigo-100 after:w-0 after:h-0 after:rounded-full after:transition-all after:duration-300 hover:after:w-10 hover:after:h-10 after:-left-3 after:-top-3 after:-z-10 after:opacity-0 hover:after:opacity-100">
                  <img
                    className="w-5 cursor-pointer"
                    src={assets.profile_icon}
                    alt="Profile"
                  />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-indigo-500 transition-all duration-300 hover:scale-110 relative after:absolute after:bg-indigo-100 after:w-0 after:h-0 after:rounded-full after:transition-all after:duration-300 hover:after:w-10 hover:after:h-10 after:-left-3 after:-top-3 after:-z-10 after:opacity-0 hover:after:opacity-100"
                >
                  <img
                    className="w-5 cursor-pointer"
                    src={assets.profile_icon}
                    alt="Login"
                  />
                </Link>
              )}

              {isLoggedIn && (
                <div className="invisible group-hover:visible absolute dropdown-menu right-0 pt-4 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2">
                  <div className="flex flex-col gap-2 w-48 py-4 px-6 bg-white text-gray-600 rounded-xl shadow-lg border border-indigo-100 backdrop-blur-sm">
                    <div className="text-indigo-700 font-medium border-b border-indigo-100 pb-3 mb-1">
                      {name ? name : "User"}
                    </div>
                    <Link
                      to="/order"
                      className="text-left cursor-pointer hover:text-indigo-600 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"></span>
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left cursor-pointer hover:text-indigo-600 transition-colors duration-200 py-1 hover:translate-x-1 transform transition-transform flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"></span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative text-gray-500 hover:text-indigo-500 transition-all duration-300 hover:scale-110 after:absolute after:bg-indigo-100 after:w-0 after:h-0 after:rounded-full after:transition-all after:duration-300 hover:after:w-10 hover:after:h-10 after:-left-3 after:-top-3 after:-z-10 after:opacity-0 hover:after:opacity-100"
              aria-label={`Cart with ${getCartCount()} items`}
            >
              <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
              {getCartCount() > 0 && (
                <div className="absolute -right-1 -bottom-1 flex items-center justify-center w-5 h-5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full text-[9px] font-bold shadow-md">
                  {getCartCount()}
                </div>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setVisible(true)}
              className="focus:outline-none sm:hidden text-gray-500 hover:text-indigo-500 transition-all duration-300 hover:scale-110 relative after:absolute after:bg-indigo-100 after:w-0 after:h-0 after:rounded-full after:transition-all after:duration-300 hover:after:w-10 hover:after:h-10 after:-left-3 after:-top-3 after:-z-10 after:opacity-0 hover:after:opacity-100"
              aria-label="Menu"
            >
              <img
                src={assets.menu_icon}
                className="w-5 cursor-pointer"
                alt="Menu"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-gradient-to-b from-white to-indigo-50 transition-transform duration-500 ease-out ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col text-gray-600 h-full">
            {/* Mobile Menu Header */}
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-5 cursor-pointer border-b border-indigo-100"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt=""
              />
              <p className="text-indigo-600 font-medium">Close Menu</p>
            </div>

            {/* Mobile Menu Links */}
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-4 px-6 border-b border-indigo-100 transition-colors duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-50 to-indigo-50 text-indigo-600 font-medium"
                    : "hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-4 px-6 border-b border-indigo-100 transition-colors duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-50 to-indigo-50 text-indigo-600 font-medium"
                    : "hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-4 px-6 border-b border-indigo-100 transition-colors duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-50 to-indigo-50 text-indigo-600 font-medium"
                    : "hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-4 px-6 border-b border-indigo-100 transition-colors duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-50 to-indigo-50 text-indigo-600 font-medium"
                    : "hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
              to="/contact"
            >
              CONTACT
            </NavLink>

            {/* Mobile Menu User Section */}
            {isLoggedIn ? (
              <>
                <div className="py-4 px-6 border-b border-indigo-100 text-indigo-600 font-medium bg-gradient-to-r from-sky-50 to-indigo-50">
                  {name ? name : "User"}
                </div>
                <Link
                  to="/orders"
                  className="py-4 px-6 border-b border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300"
                  onClick={() => setVisible(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setVisible(false);
                  }}
                  className="py-4 px-6 border-b border-indigo-100 text-left w-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="py-4 px-6 border-b border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300"
                onClick={() => setVisible(false)}
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Footer */}
            <div className="mt-auto p-6 text-center text-xs text-gray-400">
              <p>© 2024 Your Shop. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
