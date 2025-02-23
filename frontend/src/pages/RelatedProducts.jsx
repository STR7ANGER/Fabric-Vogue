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

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item) => (
          <div
            key={item._id}
            onClick={() => handleProductClick(item._id)} 
            className="cursor-pointer"
          >
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
