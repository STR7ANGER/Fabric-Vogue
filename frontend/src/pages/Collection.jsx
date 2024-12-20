import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [priceFilter, setPriceFilter] = useState("relevant");

  const toggleFilter = (filterType, value) => {
    const setFilter = filterType === "category" ? setCategory : setSubCategory;
    const filterList = filterType === "category" ? category : subCategory;

    if (filterList.includes(value)) {
      setFilter((prev) => prev.filter((item) => item !== value));
    } else {
      setFilter((prev) => [...prev, value]);
    }

    // Reset price filter to "relevant"
    setPriceFilter("relevant");
  };

  useEffect(() => {
    let filteredProducts = products;

    // Apply category and subCategory filters
    if (category.length > 0 || subCategory.length > 0) {
      filteredProducts = filteredProducts.filter(
        (item) =>
          (category.length === 0 || category.includes(item.category)) &&
          (subCategory.length === 0 || subCategory.includes(item.subCategory))
      );
    }

    // Apply search filter if showSearch is true and search term exists
    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply price filter
    if (priceFilter === "relevant") {
      filteredProducts = filteredProducts.sort(() => Math.random() - 0.5);
    } else if (priceFilter === "low-high") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "high-low") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filteredProducts);
  }, [category, subCategory, products, search, showSearch, priceFilter]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
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
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <p className="flex gap-2" key={cat}>
                <input
                  className="w-3"
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
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">SUBCATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
              <p className="flex gap-2" key={subCat}>
                <input
                  className="w-3"
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
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
