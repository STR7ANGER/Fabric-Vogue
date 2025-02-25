import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    currency,
    calculateOrderDetails,
    clearCart,
    appliedCoupon,
    processOrder,
  } = useContext(ShopContext);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const orderDetails = calculateOrderDetails(cartItems);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    if (orderDetails.subtotal === 0) {
      toast.error("Your cart is empty!");
      navigate("/cart");
      return;
    }

    // Disable the button while processing to prevent multiple clicks
    setIsProcessing(true);

    try {
      // Convert payment method names to match backend endpoints
      let paymentMethodBackend;
      if (selectedPayment === "stripe") {
        paymentMethodBackend = "stripe";
      } else {
        paymentMethodBackend = "cod";
      }

      // Process the order using the context function
      const result = await processOrder(formData, paymentMethodBackend);

      if (result && result.success) {
        // Show success message for COD orders (for Stripe, we redirect)
        if (paymentMethodBackend === "cod") {
          toast.success("Order placed successfully!");
          // Redirect to orders page
          navigate("/order");
        }
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 p-6 flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t relative">
      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-1/3 top-0 w-64 h-64 bg-gradient-to-b from-pink-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Left Column - Delivery Information */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl shadow-purple-900/5">
          <div className="relative mb-8">
            <span className="absolute -top-4 left-0 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 tracking-widest">
              YOUR DETAILS
            </span>
            <div className="relative inline-block">
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                onChange={handleInputChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="street"
              placeholder="Street"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
              onChange={handleInputChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                onChange={handleInputChange}
                required
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
              onChange={handleInputChange}
              required
            />
          </form>
        </div>

        {/* Right Column - Cart Totals & Payment */}
        <div className="space-y-8">
          {/* Cart Totals */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl shadow-purple-900/5">
            <div className="relative mb-8">
              <span className="absolute -top-4 left-0 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 tracking-widest">
                YOUR ORDER
              </span>
              <div className="relative inline-block">
                <Title text1={"CART"} text2={"TOTAL"} />
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50/80 rounded-lg">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
                  {currency}
                  {orderDetails.subtotal.toFixed(2)}
                </span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between items-center p-3 bg-green-50/80 rounded-lg">
                  <span className="text-green-600 font-medium">
                    Discount ({appliedCoupon.code})
                  </span>
                  <span className="text-green-600 font-medium">
                    - {currency}
                    {appliedCoupon.discount.toFixed(2)}
                  </span>
                </div>
              )}

              {orderDetails.subtotal > 0 && (
                <div className="flex justify-between items-center p-3 bg-gray-50/80 rounded-lg">
                  <span className="text-gray-600 font-medium">
                    Shipping Fee
                  </span>
                  <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
                    {currency}
                    {orderDetails.shippingFee.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-900/10 via-indigo-800/10 to-blue-900/10 rounded-lg mt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
                  {currency}
                  {orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl shadow-purple-900/5">
            <div className="relative mb-8">
              <span className="absolute -top-4 left-0 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 tracking-widest">
                CHOOSE METHOD
              </span>
              <div className="relative inline-block">
                <Title text1={"PAYMENT"} text2={"METHOD"} />
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900"></div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 hover:shadow-md hover:shadow-purple-900/10 transition-all duration-300">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={selectedPayment === "stripe"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="form-radio text-purple-600"
                />
                <img
                  src={assets.stripe_logo}
                  alt="Stripe"
                  className="h-6 object-contain"
                />
              </label>

              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 hover:shadow-md hover:shadow-purple-900/10 transition-all duration-300">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedPayment === "cod"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="form-radio text-purple-600"
                />
                <span className="text-gray-600 font-medium">
                  CASH ON DELIVERY
                </span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white py-4 rounded-lg hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={orderDetails.subtotal === 0 || isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  PROCESSING...
                </span>
              ) : (
                "PLACE ORDER"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
