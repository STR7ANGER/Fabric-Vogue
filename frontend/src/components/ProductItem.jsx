import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className="text-gray-700 cursor-pointer block" to={`/product/${id}`}>
      <div className="overflow-hidden rounded-lg relative">
        <img
          className="hover:scale-110 transition ease-in-out duration-500 w-full h-full object-cover"
          src={image[0]}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <p className="pt-3 pb-1 text-sm font-medium group-hover:text-transparent hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-900 hover:via-indigo-800 hover:to-blue-900 transition-colors duration-300">
        {name}
      </p>
      <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
