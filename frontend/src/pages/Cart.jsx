import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";


const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateItemQuantity,
    confirmDelete,
    setConfirmDelete,
    removeItem,
    coupons,
    appliedCoupon,
    applyCoupon,
    calculateOrderDetails,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const navigate = useNavigate();

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

  const handleQuantityChange = (itemId, size, quantity) => {
    if (quantity === 0) {
      setConfirmDelete({ itemId, size });
    } else {
      updateItemQuantity(itemId, size, quantity);
    }
  };

  const handleModalConfirmDelete = () => {
    if (confirmDelete) {
      removeItem(confirmDelete.itemId, confirmDelete.size);
      setConfirmDelete(null); // Close the modal after deletion
    }
  };

  // Added missing handleModalCancel function
  const handleModalCancel = () => {
    setConfirmDelete(null);
  };

  const handleApplyCoupon = () => {
    if (!selectedCoupon) {
      toast.error("Please select a coupon");
      return;
    }

    if (cartData.length === 0) {
      toast.error("Cannot apply coupon to empty cart");
      return;
    }

    applyCoupon(selectedCoupon);
  };

  const handlePlaceOrder = () => {
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
              My Bag ({cartData.length} {cartData.length === 1 ? "item" : "items"})
            </h2>

            <div className="space-y-0">
              {cartData.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="flex gap-4 py-4 border-b"
                >
                  <img
                    src={item.image || "/api/placeholder/120/160"}
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
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
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
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="mt-2 text-red-600 p-2 hover:bg-red-50 rounded flex items-center gap-2"
                      onClick={() =>
                        setConfirmDelete({ itemId: item._id, size: item.size })
                      }
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
              {orderDetails.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>
                    - {currency}
                    {orderDetails.discount.toFixed(2)}
                  </span>
                </div>
              )}
              {cartData.length > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {orderDetails.shippingFee === 0
                      ? "FREE"
                      : `${currency}${orderDetails.shippingFee.toFixed(2)}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Order Total</span>
                <span>
                  {currency}
                  {orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Available Coupons</h4>
              <div className="space-y-2 mb-4">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      selectedCoupon === coupon.code
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => setSelectedCoupon(coupon.code)}
                  >
                    <div className="font-medium">{coupon.code}</div>
                    <div className="text-sm text-gray-600">
                      {coupon.description}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleApplyCoupon}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg mb-4 disabled:bg-blue-300"
                disabled={cartData.length === 0}
              >
                Apply Selected Coupon
              </button>
              <button
                onClick={handlePlaceOrder}
                className={`w-full px-4 py-2 ${
                  cartData.length === 0 ? "bg-gray-400" : "bg-green-600"
                } text-white rounded-lg disabled:bg-gray-300`}
                disabled={cartData.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">
              Are you sure you want to remove this item?
            </h3>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleModalCancel}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleModalConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;