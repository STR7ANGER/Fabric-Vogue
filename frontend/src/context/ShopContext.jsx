import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10;
  const MIN_ORDER_VALUE = 500;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

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

  const logout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    delete axios.defaults.headers.common["Authorization"];
    clearCart();
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  const getCartData = async () => {
    const userId = localStorage.getItem("userId");
    if (!isLoggedIn || !userId) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data.message || "Failed to fetch cart data");
      }
    } catch (error) {
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

  useEffect(() => {
    if (isLoggedIn) {
      getCartData();
    }
  }, [isLoggedIn]);

  const clearCart = () => {
    setCartItems({});
    setAppliedCoupon(null);
  };

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
              quantity,
              size,
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const newOrder = response.data.order;
        setOrders((prevOrders) => [...prevOrders, newOrder]);
        clearCart();
        return newOrder;
      }

      toast.error(response.data.message || "Failed to create order");
      return null;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process order");
      return null;
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const contextValue = {
    currency,
    deliveryFee,
    MIN_ORDER_VALUE,
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    logout,
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
    getCartData,
    clearCart,
    coupons,
    applyCoupon,
    validateCoupon,
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
