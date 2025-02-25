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
    <div className="relative px-4 mt-20 sm:px-8 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-indigo-800/5 to-blue-900/5 rounded-2xl"></div>
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>

      {/* Title section with gradients */}
      <div className="relative text-center mb-12">
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 tracking-widest">
          EXPLORE OUR RANGE
        </span>
        <div className="relative inline-block">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900"></div>
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col sm:flex-row gap-8 pt-6 border-t border-gray-200/50">
        {/* Filter Options */}
        <div className="min-w-60 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg shadow-purple-900/5">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800 font-semibold flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />
          </p>

          {/* Filter Categories */}
          <div
            className={`mt-6 pl-5 py-3 bg-gradient-to-r from-purple-900/5 via-indigo-800/5 to-blue-900/5 rounded-lg ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
              CATEGORIES
            </p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Men", "Women", "Boy", "Girl", "Kids"].map((cat) => (
                <p className="flex gap-2" key={cat}>
                  <input
                    className="w-3 accent-purple-800"
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
            className={`my-5 pl-5 py-3 bg-gradient-to-r from-purple-900/5 via-indigo-800/5 to-blue-900/5 rounded-lg ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
              SUBCATEGORIES
            </p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {[
                "Topwear",
                "Bottomwear",
                "Winterwear",
                "Footwear",
                "Headwear",
              ].map((subCat) => (
                <p className="flex gap-2" key={subCat}>
                  <input
                    className="w-3 accent-purple-800"
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
            <p className="text-sm text-gray-500">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800 font-medium">
                {filterProducts.length}
              </span>{" "}
              products
            </p>
            <div className="relative">
              <select
                className="appearance-none bg-white/80 backdrop-blur-sm border border-purple-200 text-sm px-4 py-2 pr-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-indigo-800/5 to-blue-900/5 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <ProductItem
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
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
              ))
            ) : (
              <div className="col-span-full py-10 text-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                  <p className="text-gray-500 mb-4">
                    No products match your current filters.
                  </p>
                  <button
                    onClick={() => {
                      setCategory([]);
                      setSubCategory([]);
                    }}
                    className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white text-sm font-medium py-2 px-6 rounded-full shadow-lg"
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
