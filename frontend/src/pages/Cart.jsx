import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Trash2, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    backendUrl,
    isLoggedIn,
    confirmDelete,
    setConfirmDelete,
    calculateOrderDetails,
    getCartData,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      getCartData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            tempData.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size],
              name: product.name,
              price: product.price || 0,
              image: product.image,
              originalPrice: product.originalPrice || 0,
            });
          }
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  const handleQuantityChange = async (itemId, size, quantity) => {
    if (!isLoggedIn) {
      toast.error("Please login to update cart");
      navigate("/login");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Session expired. Please login again");
      navigate("/login");
      return;
    }

    if (quantity === 0) {
      setConfirmDelete({ itemId, size });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/cart/update`, {
        userId,
        itemId,
        size,
        quantity,
      });

      if (response.data.success) {
        await getCartData();
        toast.success("Cart updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update cart");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to update cart");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalConfirmDelete = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to remove items");
      navigate("/login");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Session expired. Please login again");
      navigate("/login");
      return;
    }

    if (confirmDelete) {
      setLoading(true);
      try {
        const response = await axios.post(`${backendUrl}/api/cart/update`, {
          userId,
          itemId: confirmDelete.itemId,
          size: confirmDelete.size,
          quantity: 0,
        });

        if (response.data.success) {
          await getCartData();
          toast.success("Item removed from cart");
        } else {
          toast.error(response.data.message || "Failed to remove item");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to remove item");
      } finally {
        setLoading(false);
        setConfirmDelete(null);
      }
    }
  };

  const handleModalCancel = () => setConfirmDelete(null);

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    if (cartData.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate("/place-order");
  };

  const orderDetails = calculateOrderDetails(cartItems);

  return (
    <div className="relative max-w-6xl mt-20 mx-auto p-6 pt-10">
      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>

      {/* Page header */}
      <div className="text-center mb-10">
        <div className="inline-block relative">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
              YOUR SHOPPING BAG
            </span>
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-purple-100">
            <div className="flex items-center gap-4 mb-6">
              <ShoppingBag className="w-5 h-5 text-purple-800" />
              <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
                My Items ({cartData.length}{" "}
                {cartData.length === 1 ? "item" : "items"})
              </h2>
            </div>

            <div className="space-y-1">
              {cartData.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="group flex gap-4 py-4 border-b border-purple-100 transition-all duration-300 hover:bg-purple-50/50 rounded-lg px-3"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-indigo-800/10 to-blue-900/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={item.image?.[0] || "/api/placeholder/120/160"}
                      alt={item.name}
                      className="w-24 h-32 object-cover rounded-lg shadow-md border border-purple-100"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size:{" "}
                      <span className="text-purple-700 font-medium">
                        {item.size}
                      </span>
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        disabled={loading}
                        className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-purple-900/80 via-indigo-800/80 to-blue-900/80 text-white rounded-full shadow-md disabled:opacity-50 hover:shadow-lg transition-shadow duration-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        disabled={loading}
                        className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-purple-900/80 via-indigo-800/80 to-blue-900/80 text-white rounded-full shadow-md disabled:opacity-50 hover:shadow-lg transition-shadow duration-300"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      className="mt-2 text-red-600 p-2 hover:bg-red-50 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-colors duration-300"
                      onClick={() =>
                        setConfirmDelete({ itemId: item._id, size: item.size })
                      }
                      disabled={loading}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                    {item.originalPrice > item.price && (
                      <>
                        <p className="text-sm text-gray-500 line-through">
                          {currency}
                          {(item.originalPrice * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-green-600 text-sm font-medium bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">
                          {Math.round(
                            ((item.originalPrice - item.price) /
                              item.originalPrice) *
                              100
                          )}
                          % OFF
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {cartData.length === 0 && (
              <div className="text-center py-12 px-6">
                <div className="w-16 h-16 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-purple-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Your bag is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added anything to your bag yet.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-6 py-2 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white rounded-full shadow-lg hover:shadow-purple-900/20 transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-purple-100 sticky top-4">
            <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800 text-lg mb-6">
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bag total</span>
                <span className="font-medium">
                  {currency}
                  {orderDetails.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 border-y border-purple-100">
                <span className="font-semibold text-gray-800">Order Total</span>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800 text-lg">
                  {currency}
                  {orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handlePlaceOrder}
                className={`w-full py-3 px-4 rounded-full font-medium transition-all duration-300 shadow-lg ${
                  cartData.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white hover:shadow-purple-900/30 hover:shadow-xl"
                }`}
                disabled={cartData.length === 0 || loading}
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
              </button>

              <button
                onClick={() => navigate("/collection")}
                className="w-full mt-4 py-2 px-4 border border-purple-300 text-purple-800 rounded-full font-medium hover:bg-purple-50 transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-100">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <div className="w-1 h-1 rounded-full bg-purple-800"></div>
                <p>Secure payments</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                <div className="w-1 h-1 rounded-full bg-purple-800"></div>
                <p>Free returns within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-4">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800 mb-3">
              Remove Item
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this item from your bag?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleModalCancel}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-purple-200 rounded-full text-purple-800 hover:bg-purple-50 disabled:bg-gray-100 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleModalConfirmDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white rounded-full hover:shadow-lg disabled:opacity-70 transition-all duration-300"
              >
                {loading ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
