import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "./RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, backendUrl, isLoggedIn, getCartData } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products?.length && productId) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setSelectedImage(product.image?.[0] || "");
      }
    }
  }, [productId, products]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Session expired. Please login again");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/cart/add`, {
        userId,
        itemId: productId,
        size: selectedSize,
      });

      if (response.data.success) {
        getCartData();
        toast.success(response.data.message || "Added to cart");
      } else {
        toast.error(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to add to cart");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image?.map((imgSrc, index) => (
              <img
                key={`${productId}-thumb-${index}`}
                src={imgSrc}
                alt={`${productData.name} view ${index + 1}`}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedImage(imgSrc)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={
                selectedImage ||
                productData.image?.[0] ||
                "/api/placeholder/400/600"
              }
              alt={productData.name}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <img
                key={`star-${index}`}
                src={assets.star_icon}
                alt="Star rating"
                className="w-3.5"
              />
            ))}
            <img
              src={assets.star_dull_icon}
              alt="Star rating"
              className="w-3.5"
            />
            <p className="pl-2">(122)</p>
          </div>

          <div className="mt-5">
            <p className="text-3xl font-medium">
              {currency}
              {productData.price?.toFixed(2)}
            </p>
            {productData.originalPrice > productData.price && (
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-500 line-through">
                  {currency}
                  {productData.originalPrice?.toFixed(2)}
                </p>
                <p className="text-green-600">
                  {Math.round(
                    ((productData.originalPrice - productData.price) /
                      productData.originalPrice) *
                      100
                  )}
                  % OFF
                </p>
              </div>
            )}
          </div>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    size === selectedSize ? "border-orange-500" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available</p>
            <p>Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <button className="border px-5 py-3 text-sm font-bold">
            Description
          </button>
          <button className="border px-5 py-3 text-sm">Reviews (122)</button>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
          <p>
            {productData.longDescription ||
              "Additional product details and features will be listed here."}
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productId}
      />
    </div>
  );
};

export default Product;
