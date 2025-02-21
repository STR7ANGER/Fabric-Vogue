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
  const [user, setUser] = useState(null);
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

  // Authentication Functions
  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/login`,
        credentials
      );

      if (response.data.sucess) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setToken(token);
        setIsLoggedIn(true);
        toast.success(response.data.message || "Login successful!");
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/register`,
        userData
      );
      if (response.data.sucess === true && response.data.token) {
        toast.success("Account created successfully!");
        return {
          success: true,
          token: response.data.token,
        };
      }
      if (response.data.sucess === false) {
        toast.error(response.data.message);
        return {
          success: false,
          message: response.data.message,
        };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    clearCart();
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, [token]);

  // Cart Functions
  const addToCart = (itemID, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    const cartData = structuredClone(cartItems);
    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size] += 1;
      } else {
        cartData[itemID][size] = 1;
      }
    } else {
      cartData[itemID] = { [size]: 1 };
    }

    setCartItems(cartData);
    validateCoupon(cartData);
    toast.success("Product added to cart");
  };

  const updateItemQuantity = (itemID, size, quantity) => {
    if (quantity < 0) return;

    const cartData = structuredClone(cartItems);
    if (cartData[itemID] && cartData[itemID][size]) {
      cartData[itemID][size] = quantity;
    }

    setCartItems(cartData);
    validateCoupon(cartData);
  };

  const removeItem = (itemID, size) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itemID] && updatedCart[itemID][size]) {
      delete updatedCart[itemID][size];
      if (Object.keys(updatedCart[itemID]).length === 0) {
        delete updatedCart[itemID];
      }
      setCartItems(updatedCart);
      validateCoupon(updatedCart);
      toast.success("Product removed from cart");
    }
    setConfirmDelete(null);
  };

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
  };

  // Product Functions
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data) {
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
    user,
    token,
    setToken,
    login,
    signup,
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
    addToCart,
    updateItemQuantity,
    removeItem,
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
