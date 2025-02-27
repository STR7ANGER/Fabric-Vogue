import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./../components/ProductItem";
import Title from "./../components/Title";

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products
        .filter(
          (item) =>
            item.category === category &&
            item.subCategory === subCategory &&
            item._id !== currentProductId
        )
        .slice(0, 5); // Limit to 5 products
      setRelated(filteredProducts);
    }
  }, [products, category, subCategory, currentProductId]);

  const handleProductClick = (id) => {
    if (id !== currentProductId) {
      window.scrollTo(0, 0);
      navigate(`/product/${id}`);
    }
  };

  if (related.length === 0) {
    return null; // Don't render if no related products
  }

  return (
    <div className="my-24 relative z-10">
      <div className="text-center py-6 relative">
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 tracking-widest">
          YOU MAY ALSO LIKE
        </span>
        <Title text1="RELATED" text2="PRODUCTS" />
        <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item) => (
          <div
            key={item._id}
            onClick={() => handleProductClick(item._id)}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative"
          >
            {/* Hover effect glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-fuchsia-900/10 to-indigo-900/10 rounded-xl -m-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />

            {/* Price tag with gradient */}
            <div className="absolute top-2 right-2 z-10">
              <div className="bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded shadow-md">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 text-sm font-semibold">
                  ${item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
