import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Trash2 } from "lucide-react";
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
    <div className="max-w-6xl mx-auto p-4 flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              My Bag ({cartData.length}{" "}
              {cartData.length === 1 ? "item" : "items"})
            </h2>

            <div className="space-y-0">
              {cartData.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="flex gap-4 py-4 border-b"
                >
                  <img
                    src={item.image?.[0] || "/api/placeholder/120/160"}
                    alt={item.name}
                    className="w-24 h-32 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        disabled={loading}
                        className="text-xs bg-gray-200 px-2 py-1 rounded disabled:bg-gray-100"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        disabled={loading}
                        className="text-xs bg-gray-200 px-2 py-1 rounded disabled:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="mt-2 text-red-600 p-2 hover:bg-red-50 rounded flex items-center gap-2 disabled:opacity-50"
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
                    <p className="font-semibold">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                    {item.originalPrice > item.price && (
                      <>
                        <p className="text-sm text-gray-500 line-through">
                          {currency}
                          {(item.originalPrice * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-green-600 text-sm">
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
              <div className="text-center py-8 text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Order Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Bag total</span>
                <span>
                  {currency}
                  {orderDetails.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Order Total</span>
                <span>
                  {currency}
                  {orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handlePlaceOrder}
                className={`w-full px-4 py-2 ${
                  cartData.length === 0 ? "bg-gray-400" : "bg-green-600"
                } text-white rounded-lg disabled:bg-gray-300`}
                disabled={cartData.length === 0 || loading}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">
              Are you sure you want to remove this item?
            </h3>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleModalCancel}
                disabled={loading}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-200 disabled:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleModalConfirmDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400"
              >
                {loading ? "Removing..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
