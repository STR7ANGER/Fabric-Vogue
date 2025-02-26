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
  const [activeTab, setActiveTab] = useState("description");

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
        <div className="text-xl text-gray-300 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-violet-600 border-b-fuchsia-600 border-r-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
            Loading product...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4 mb-10 mt-20 sm:px-8 py-16 transition-opacity ease-in duration-500 opacity-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-purple-950/80 to-indigo-950/80 rounded-xl"></div>
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl -z-10"></div>

      <div className="relative flex gap-12 sm:gap-12 flex-col sm:flex-row z-10">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll max-h-96 justify-between sm:justify-normal sm:w-[18.7%] w-full scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-transparent p-1">
            {productData.image?.map((imgSrc, index) => (
              <div
                key={`${productId}-thumb-${index}`}
                className={`relative mb-3 transition-all duration-300 ${
                  selectedImage === imgSrc ? "scale-105" : ""
                }`}
              >
                <img
                  src={imgSrc}
                  alt={`${productData.name} view ${index + 1}`}
                  className={`w-[24%] sm:w-full flex-shrink-0 cursor-pointer rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
                    selectedImage === imgSrc
                      ? "ring-2 ring-violet-600 shadow-lg shadow-violet-900/30"
                      : "border border-purple-900/20"
                  }`}
                  onClick={() => setSelectedImage(imgSrc)}
                />
                {selectedImage === imgSrc && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-fuchsia-900/10 to-indigo-900/10 rounded-lg pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
          <div className="w-full sm:w-[80%] rounded-lg overflow-hidden shadow-lg shadow-purple-900/20 border border-purple-900/20">
            <img
              src={
                selectedImage ||
                productData.image?.[0] ||
                "/api/placeholder/400/600"
              }
              alt={productData.name}
              className="w-full h-auto object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex-1 bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-lg shadow-purple-900/20 border border-purple-900/20">
          <h1 className="font-medium text-2xl mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
            {productData.name}
          </h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <img
                key={`star-${index}`}
                src={assets.star_icon}
                alt="Star rating"
                className="w-3.5 brightness-150"
              />
            ))}
            <img
              src={assets.star_dull_icon}
              alt="Star rating"
              className="w-3.5 brightness-150"
            />
            <p className="pl-2 text-gray-400">(122)</p>
          </div>

          <div className="mt-5">
            <p className="text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
              {currency}
              {productData.price?.toFixed(2)}
            </p>
            {productData.originalPrice > productData.price && (
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-500 line-through">
                  {currency}
                  {productData.originalPrice?.toFixed(2)}
                </p>
                <p className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
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

          <p className="mt-5 text-gray-300 md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 font-medium">
              Select Size
            </p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 rounded-lg transition-all duration-300 ${
                    size === selectedSize
                      ? "border-none bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white shadow-lg shadow-purple-900/30"
                      : "bg-gray-800/70 hover:bg-gray-700/70 border-purple-900/30 text-gray-300"
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
            className="bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white px-8 py-3 text-sm font-medium rounded-full shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>

          <hr className="mt-8 sm:w-4/5 border-purple-900/30" />
          <div className="text-sm text-gray-400 mt-5 flex flex-col gap-1">
            <p className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-full"></span>
              100% Original Product
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-full"></span>
              Cash on delivery is available
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-full"></span>
              Easy return and exchange within 7 days
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 relative z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-all duration-300 ${
              activeTab === "description"
                ? "bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white border-b-0"
                : "bg-gray-900/60 text-gray-300 hover:bg-gray-800/60"
            } border border-purple-900/30`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-all duration-300 ${
              activeTab === "reviews"
                ? "bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white border-b-0"
                : "bg-gray-900/60 text-gray-300 hover:bg-gray-800/60"
            } border border-purple-900/30 ${
              activeTab === "description" ? "border-l-0" : ""
            }`}
          >
            Reviews (122)
          </button>
        </div>
        <div className="flex flex-col gap-4 border border-purple-900/30 px-6 py-6 text-sm text-gray-300 bg-gray-900/60 backdrop-blur-sm rounded-lg rounded-tl-none shadow-lg shadow-purple-900/20">
          {activeTab === "description" ? (
            <>
              <p className="leading-relaxed">{productData.description}</p>
              <p className="leading-relaxed">
                {productData.longDescription ||
                  "Additional product details and features will be listed here."}
              </p>
            </>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-violet-400 font-bold">JD</span>
                </div>
                <div>
                  <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    John Doe
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, index) => (
                      <img
                        key={`review-star-${index}`}
                        src={assets.star_icon}
                        alt="Star rating"
                        className="w-3 brightness-150"
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-2">
                      2 months ago
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                Great product! The quality exceeds my expectations and it fits
                perfectly. Would definitely recommend to anyone looking for this
                type of item.
              </p>
              <hr className="border-purple-900/30" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-violet-400 font-bold">AS</span>
                </div>
                <div>
                  <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    Anna Smith
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(4)].map((_, index) => (
                      <img
                        key={`review-star-${index}`}
                        src={assets.star_icon}
                        alt="Star rating"
                        className="w-3 brightness-150"
                      />
                    ))}
                    <img
                      src={assets.star_dull_icon}
                      alt="Star rating"
                      className="w-3 brightness-150"
                    />
                    <span className="text-xs text-gray-400 ml-2">
                      3 months ago
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                I'm really happy with this purchase. The material is high
                quality and durable. Shipping was also very fast. Only giving 4
                stars because the color is slightly different than in the
                pictures.
              </p>
            </div>
          )}
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
