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
    <div className="max-w-6xl mx-auto p-6 flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Left Column - Delivery Information */}
        <div>
          <h2 className="text-xl font-medium mb-6">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="street"
              placeholder="Street"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              required
            />
          </form>
        </div>

        {/* Right Column - Cart Totals & Payment */}
        <div>
          {/* Cart Totals */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-6">
              <Title text1={"CART"} text2={"TOTAL"} />
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {currency}
                  {orderDetails.subtotal.toFixed(2)}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>
                    - {currency}
                    {appliedCoupon.discount.toFixed(2)}
                  </span>
                </div>
              )}
              {orderDetails.subtotal > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="font-medium">
                    {currency}
                    {orderDetails.shippingFee.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-gray-600">Total</span>
                <span className="font-medium">
                  {currency}
                  {orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-medium mb-6">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </h2>

            <div className="space-y-4 mb-6">
              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={selectedPayment === "stripe"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="form-radio text-blue-600"
                />
                <img
                  src={assets.stripe_logo}
                  alt="Stripe"
                  className="h-6 object-contain"
                />
              </label>

              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedPayment === "cod"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="form-radio text-blue-600"
                />
                <span className="text-gray-600">CASH ON DELIVERY</span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={orderDetails.subtotal === 0 || isProcessing}
            >
              {isProcessing ? "PROCESSING..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
