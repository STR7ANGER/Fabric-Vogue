import React, { useContext, useState, useEffect, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [priceFilter, setPriceFilter] = useState("relevant");
  const [initialSortKey] = useState(Math.random());

  const toggleFilter = (filterType, value) => {
    const setFilter = filterType === "category" ? setCategory : setSubCategory;
    const filterList = filterType === "category" ? category : subCategory;

    if (filterList.includes(value)) {
      setFilter((prev) => prev.filter((item) => item !== value));
    } else {
      setFilter((prev) => [...prev, value]);
    }
  };

  const filterProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (category.length > 0 || subCategory.length > 0) {
      filteredProducts = filteredProducts.filter(
        (item) =>
          (category.length === 0 || category.includes(item.category)) &&
          (subCategory.length === 0 || subCategory.includes(item.subCategory))
      );
    }

    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priceFilter === "relevant") {
      filteredProducts.sort((a, b) => {
        const hashA = (a._id + initialSortKey) % 1;
        const hashB = (b._id + initialSortKey) % 1;
        return hashA - hashB;
      });
    } else if (priceFilter === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  }, [
    category,
    subCategory,
    products,
    search,
    showSearch,
    priceFilter,
    initialSortKey,
  ]);

  return (
    <div className="relative px-4 mb-10 mt-14 sm:px-8 py-16 shadow-sm shadow-white rounded-lg">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-purple-950/80 to-indigo-950/80 rounded-xl"></div>
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl -z-10"></div>

      {/* Title section with gradients */}
      <div className="relative text-center mb-12 z-10">
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 tracking-widest">
          EXPLORE OUR RANGE
        </span>
        <div className="relative inline-block">
          <Title text1="ALL" text2="COLLECTIONS" />
          <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800"></div>
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col sm:flex-row gap-8 pt-6 border-t border-purple-900/30 z-10">
        {/* Filter Options */}
        <div className="min-w-60 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-lg shadow-purple-900/30 border border-purple-900/20">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-semibold flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden ${
                showFilter ? "rotate-90" : ""
              } brightness-200`}
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />
          </p>

          {/* Filter Categories */}
          <div
            className={`mt-6 pl-5 py-3 bg-gradient-to-r from-gray-900/70 via-purple-950/70 to-indigo-950/70 rounded-lg border border-purple-900/10 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              CATEGORIES
            </p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-300">
              {["Men", "Women", "Boy", "Girl", "Kids"].map((cat) => (
                <p className="flex gap-2 items-center" key={cat}>
                  <input
                    className="w-3 h-3 accent-violet-700 bg-gray-800 border-purple-900/50"
                    type="checkbox"
                    value={cat}
                    checked={category.includes(cat)}
                    onChange={() => toggleFilter("category", cat)}
                    aria-label={`Filter by ${cat}`}
                  />
                  {cat}
                </p>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div
            className={`my-5 pl-5 py-3 bg-gradient-to-r from-gray-900/70 via-purple-950/70 to-indigo-950/70 rounded-lg border border-purple-900/10 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              SUBCATEGORIES
            </p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-300">
              {[
                "Topwear",
                "Bottomwear",
                "Winterwear",
                "Footwear",
                "Headwear",
              ].map((subCat) => (
                <p className="flex gap-2 items-center" key={subCat}>
                  <input
                    className="w-3 h-3 accent-violet-700 bg-gray-800 border-purple-900/50"
                    type="checkbox"
                    value={subCat}
                    checked={subCategory.includes(subCat)}
                    onChange={() => toggleFilter("subCategory", subCat)}
                    aria-label={`Filter by ${subCat}`}
                  />
                  {subCat}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          {/* Product Count & Sort */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-sm text-gray-400">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-medium">
                {filterProducts.length}
              </span>{" "}
              products
            </p>
            <div className="relative">
              <select
                className="appearance-none bg-gray-900/80 backdrop-blur-sm border border-purple-900/30 text-gray-300 text-sm px-4 py-2 pr-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-violet-900/30"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Map Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
            {filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <div
                  key={item._id || index}
                  className="group relative transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  {/* Hover effect glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-fuchsia-900/10 to-indigo-900/10 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <ProductItem
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
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
              ))
            ) : (
              <div className="col-span-full py-10 text-center">
                <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-900/20">
                  <p className="text-gray-300 mb-4">
                    No products match your current filters.
                  </p>
                  <button
                    onClick={() => {
                      setCategory([]);
                      setSubCategory([]);
                    }}
                    className="bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white text-sm font-medium py-2 px-6 rounded-full shadow-lg"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
