import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    deliveryFee,
    setCartItems,
    updateItemQuantity,
    confirmDelete,
    setConfirmDelete,  // New context state for modal
    removeItem,  // Method to remove item
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    subtotal: 0,
    discount: 0,
    total: 0,
  });

  const MIN_ORDER_VALUE = 500;
  const coupons = [
    { code: "NEW125", discount: 125, description: "Get Flat Rs 125 Off on cart value of 500 & Above", minOrder: MIN_ORDER_VALUE },
    { code: "FREESHIP", discount: deliveryFee, description: "Shipping on us for Your First Purchase", minOrder: 0 },
  ];

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
    updateOrderDetails(tempData, appliedCoupon);
  }, [cartItems, products]);

  const updateOrderDetails = (currentCartData, currentCoupon) => {
    const subtotal = currentCartData.reduce((total, item) => total + item.price * item.quantity, 0);
    let discount = 0;
    if (currentCoupon && subtotal >= currentCoupon.minOrder) {
      discount = currentCoupon.discount;
    } else if (currentCoupon) {
      setAppliedCoupon(null);
      currentCoupon = null;
    }

    const shippingFee = currentCoupon?.code === "FREESHIP" ? 0 : deliveryFee;
    const total = subtotal - discount + shippingFee;

    setOrderDetails({
      subtotal,
      discount,
      shippingFee,
      total,
    });
  };

  const handleQuantityChange = (itemId, size, quantity) => {
    if (quantity === 0) {
      setConfirmDelete({ itemId, size });  // Show the confirmation modal
    } else {
      updateItemQuantity(itemId, size, quantity);
    }
  };

  const handleModalConfirmDelete = () => {
    removeItem(confirmDelete.itemId, confirmDelete.size);  // Ensure item is removed on confirm
  };

  const handleModalCancel = () => {
    setConfirmDelete(null);  // Close the modal
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code");
      return;
    }

    const coupon = coupons.find((c) => c.code === couponCode.toUpperCase());
    if (!coupon) {
      toast.error("Invalid coupon code");
      return;
    }

    if (coupon.minOrder > orderDetails.subtotal) {
      const remaining = coupon.minOrder - orderDetails.subtotal;
      toast.error(`Add products worth ${currency}${remaining.toFixed(2)} more to apply this coupon`);
      return;
    }

    setAppliedCoupon(coupon);
    updateOrderDetails(cartData, coupon);
    toast.success("Coupon applied successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              My Bag ({cartData.length} {cartData.length === 1 ? "item" : "items"})
            </h2>

            <div className="space-y-0">
              {cartData.map((item) => (
                <div key={`${item._id}-${item.size}`} className="flex gap-4 py-4 border-b">
                  <img src={item.image || "/api/placeholder/120/160"} alt={item.name} className="w-24 h-32 object-cover" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="mt-2 text-red-600 p-2 hover:bg-red-50 rounded flex items-center gap-2"
                      onClick={() => removeItem(item._id, item.size)}  // Directly remove item on click
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{currency}{(item.price * item.quantity).toFixed(2)}</p>
                    {item.originalPrice > item.price && (
                      <>
                        <p className="text-sm text-gray-500 line-through">
                          {currency}{(item.originalPrice * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-green-600 text-sm">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {cartData.length === 0 && (
              <div className="text-center py-8 text-gray-500">Your cart is empty</div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Order Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Bag total</span>
                <span>{currency}{orderDetails.subtotal.toFixed(2)}</span>
              </div>
              {orderDetails.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Bag discount</span>
                  <span>- {currency}{orderDetails.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{appliedCoupon?.code === "FREESHIP" ? "FREE" : `${currency}${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Order Total</span>
                <span>{currency}{orderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Apply Coupon</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon Code"
                  className="px-4 py-2 border rounded-lg w-full"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Are you sure you want to remove this item?</h3>
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
