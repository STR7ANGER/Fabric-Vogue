import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

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

  // Fetch user's orders
  const getUserOrders = async () => {
    const userId = localStorage.getItem("userId");
    if (!isLoggedIn || !userId) return;

    try {
      console.log("Fetching orders for userId:", userId);
      // Log the complete URL for debugging
      const url = `${backendUrl}/api/orders/userorders`;
      console.log("Requesting URL:", url);

      const response = await axios.post(
        url,
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        console.log("Orders fetched successfully:", response.data.orders);
        setOrders(response.data.orders || []);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response?.status === 401) {
        logout();
        toast.error("Session expired. Please login again");
      } else if (error.response?.status === 404) {
        // If endpoint not found, check backend routes
        console.error(
          "API endpoint not found. Check backend route definition."
        );
        toast.error("Orders feature unavailable. Please try again later.");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch orders");
      }
    }
  };

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
      getUserOrders();
    }
  }, [isLoggedIn]);

  const clearCart = () => {
    setCartItems({});
  };

  const calculateOrderDetails = (currentCartItems) => {
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

    let shippingFee = itemCount > 0 ? deliveryFee : 0;

    return {
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
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

    // Format address data for backend
    const address = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipcode: formData.zipcode,
      country: formData.country,
      phone: formData.phone,
    };

    try {
      let endpoint;
      let requestData = {
        userId,
        items: orderItems,
        amount: orderDetails.total,
        address,
      };

      // Select the appropriate endpoint based on payment method
      if (paymentMethod === "cod") {
        endpoint = `${backendUrl}/api/orders/place`;
      } else if (paymentMethod === "stripe") {
        endpoint = `${backendUrl}/api/orders/stripe`;
      }

      const response = await axios.post(endpoint, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Handle Stripe redirect if necessary
        if (paymentMethod === "stripe" && response.data.session_url) {
          window.location.href = response.data.session_url;
          return null;
        }

        // For COD and non-redirect payments, update orders and clear cart
        getUserOrders(); // Refresh orders after placing a new one
        clearCart();

        return { success: true };
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
    orders,
    getCartData,
    getUserOrders,
    clearCart,
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
