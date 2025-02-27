import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { showSearch, setShowSearch, products } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Close search on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setSearchTerm("");
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowSearch]);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSearch]);

  // Filter products when search term changes
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5)); // Limit to 5 results
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/collection?search=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  };

  if (!showSearch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-gray-900/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl mx-4 rounded-xl shadow-2xl border border-purple-900/30 relative">
        {/* Close button */}
        <button
          onClick={() => {
            setShowSearch(false);
            setSearchTerm("");
          }}
          className="absolute -top-12 right-0 text-gray-300 hover:text-white transition-colors duration-300"
          aria-label="Close search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="flex items-center p-4 bg-gradient-to-r from-gray-900 via-purple-950 to-indigo-950 rounded-t-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white rounded-lg text-sm font-medium shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300"
          >
            Search
          </button>
        </form>

        {/* Search results */}
        {filteredProducts.length > 0 && (
          <div className="bg-gray-900 py-2 rounded-b-xl max-h-80 overflow-auto">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm("");
                }}
                className="flex items-center gap-4 p-3 hover:bg-gray-800 transition-colors duration-300"
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-gray-300 font-medium">{product.name}</p>
                  <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-semibold">
                    ${product.price}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}

            {filteredProducts.length > 0 && (
              <div className="p-3 text-center border-t border-purple-900/30">
                <Link
                  to={`/collection?search=${encodeURIComponent(searchTerm)}`}
                  onClick={() => {
                    setShowSearch(false);
                    setSearchTerm("");
                  }}
                  className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-medium hover:underline"
                >
                  View all results
                </Link>
              </div>
            )}
          </div>
        )}

        {searchTerm.trim() !== "" && filteredProducts.length === 0 && (
          <div className="bg-gray-900 p-6 text-center rounded-b-xl">
            <p className="text-gray-400">
              No products found matching "{searchTerm}"
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try a different search term or browse our collections
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
