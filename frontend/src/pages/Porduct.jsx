import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "./../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "./RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, backendUrl, token, isLoggedIn, getCartData } =
    useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products?.length && productId) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image?.[0] || "");
      }
    }
  }, [productId, products]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Session expired. Please login again");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        {
          userId: userId, // Use userId from localStorage instead of user._id
          itemId: productId,
          size: size,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Added to cart");
        // Refresh cart data after successful addition
        await getCartData();
      } else {
        toast.error(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  if (!productData) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image?.map((imgSrc, index) => (
              <img
                src={imgSrc}
                key={`${productId}-thumb-${index}`}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Thumbnail ${index + 1} of ${productData.name}`}
                onClick={() => setImage(imgSrc)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={image}
              alt={`Selected view of ${productData.name}`}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <img
                  key={`star-${i}`}
                  src={assets.star_icon}
                  alt="Star icon"
                  className="w-3.5"
                />
              ))}
            <img
              src={assets.star_dull_icon}
              alt="Dull star icon"
              className="w-3.5"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  aria-label={`Select size ${item}`}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 disabled:bg-gray-400"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Review */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
            urna nec nisl malesuada vulputate.
          </p>
          <p>
            Integer faucibus, nisi et commodo lacinia, justo nisi vehicula
            tortor, a tincidunt felis magna non velit.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productId}
      />
    </div>
  );
};

export default Product;
