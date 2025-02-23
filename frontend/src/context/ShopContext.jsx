import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // App Constants
  const currency = "$";
  const deliveryFee = 10;
  const MIN_ORDER_VALUE = 500;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Shop States
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Available coupons
  const coupons = [
    {
      code: "FLAT200",
      discount: 200,
      description: "Get Flat $200 Off on cart value of $500 & Above",
      minOrder: MIN_ORDER_VALUE,
    },
    {
      code: "FREESHIP",
      discount: deliveryFee,
      description: "Free Delivery on your order",
      minOrder: 0,
    },
  ];

  // Auth Functions
  const logout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    clearCart();
    toast.success("Logged out successfully");
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Cart Functions with Backend Integration
  const getCartData = async () => {
    const userId = localStorage.getItem("userId");
    if (!isLoggedIn || !userId) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data.message || "Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 401) {
        logout();
        toast.error("Session expired. Please login again");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to fetch cart data"
        );
      }
    }
  };

  // Load cart data when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      getCartData();
    }
  }, [isLoggedIn]);

  const clearCart = () => {
    setCartItems({});
    setAppliedCoupon(null);
  };

  // Coupon Functions
  const validateCoupon = (currentCartItems) => {
    if (!appliedCoupon) return;

    const { subtotal } = calculateOrderDetails(currentCartItems, null);
    if (
      subtotal < appliedCoupon.minOrder ||
      Object.keys(currentCartItems).length === 0
    ) {
      setAppliedCoupon(null);
      toast.info("Coupon removed due to cart changes");
    }
  };

  const applyCoupon = (code) => {
    const coupon = coupons.find((c) => c.code === code);
    if (!coupon) {
      toast.error("Invalid coupon");
      return false;
    }

    const { subtotal } = calculateOrderDetails(cartItems, null);
    if (subtotal < coupon.minOrder) {
      const remaining = coupon.minOrder - subtotal;
      toast.error(
        `Add products worth ${currency}${remaining.toFixed(
          2
        )} more to apply this coupon`
      );
      return false;
    }

    setAppliedCoupon(coupon);
    toast.success("Coupon applied successfully!");
    return true;
  };

  // Order Functions
  const calculateOrderDetails = (currentCartItems, coupon = appliedCoupon) => {
    let subtotal = 0;
    let itemCount = 0;

    for (const itemId in currentCartItems) {
      for (const size in currentCartItems[itemId]) {
        const quantity = currentCartItems[itemId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            subtotal += product.price * quantity;
            itemCount += quantity;
          }
        }
      }
    }

    let discount = 0;
    let shippingFee = itemCount > 0 ? deliveryFee : 0;

    if (coupon && subtotal >= coupon.minOrder) {
      if (coupon.code === "FREESHIP") {
        shippingFee = 0;
      } else {
        discount = coupon.discount;
      }
    }

    return {
      subtotal,
      discount,
      shippingFee,
      total: subtotal - discount + shippingFee,
      itemCount,
    };
  };

  const processOrder = async (formData, paymentMethod) => {
    if (!isLoggedIn) {
      toast.error("Please login to place order");
      return null;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Session expired. Please login again");
      return null;
    }

    const orderDetails = calculateOrderDetails(cartItems);

    // Create order items array from cart items
    const orderItems = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            orderItems.push({
              productId: itemId,
              name: product.name,
              price: product.price,
              quantity: quantity,
              size: size,
              image: product.image || "/api/placeholder/120/160",
              status: "Processing",
            });
          }
        }
      }
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/orders/create`,
        {
          userId,
          items: orderItems,
          orderDetails,
          shippingAddress: formData,
          paymentMethod,
          appliedCoupon: appliedCoupon?.code || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Add the new order to orders state
        const newOrder = response.data.order;
        setOrders((prevOrders) => [...prevOrders, newOrder]);

        // Clear the cart after successful order
        clearCart();
        return newOrder;
      } else {
        toast.error(response.data.message || "Failed to create order");
        return null;
      }
    } catch (error) {
      console.error("Process order error:", error);
      toast.error(error.response?.data?.message || "Failed to process order");
      return null;
    }
  };

  // Product Functions
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  };

  // Load products on mount
  useEffect(() => {
    getProductsData();
  }, []);

  const contextValue = {
    // App Constants
    currency,
    deliveryFee,
    MIN_ORDER_VALUE,
    backendUrl,

    // Auth States and Functions
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    logout,

    // Shop States
    products,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    confirmDelete,
    setConfirmDelete,
    appliedCoupon,
    orders,

    // Cart Functions
    getCartData,
    clearCart,

    // Coupon Functions
    coupons,
    applyCoupon,
    validateCoupon,

    // Order Functions
    calculateOrderDetails,
    processOrder,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
