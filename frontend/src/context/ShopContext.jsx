import { createContext, useState } from "react";
import { products } from "../assets/assets.js";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10;
  const MIN_ORDER_VALUE = 500;
  
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Available coupons
  const coupons = [
    { 
      code: "FLAT200", 
      discount: 200, 
      description: "Get Flat $200 Off on cart value of $500 & Above", 
      minOrder: MIN_ORDER_VALUE 
    },
    { 
      code: "FREESHIP", 
      discount: deliveryFee, 
      description: "Free Delivery on your order", 
      minOrder: 0 
    },
  ];

  // Calculate order details with coupon application
  const calculateOrderDetails = (currentCartItems, coupon = appliedCoupon) => {
    let subtotal = 0;
    let itemCount = 0;

    // Calculate totals from cart items
    for (const itemId in currentCartItems) {
      for (const size in currentCartItems[itemId]) {
        const quantity = currentCartItems[itemId][size];
        if (quantity > 0) {
          const product = products.find(p => p._id === itemId);
          if (product) {
            subtotal += product.price * quantity;
            itemCount += quantity;
          }
        }
      }
    }

    let discount = 0;
    let shippingFee = itemCount > 0 ? deliveryFee : 0;

    // Apply coupon if valid
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
      itemCount
    };
  };

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
    }
    setConfirmDelete(null);
  };

  const validateCoupon = (currentCartItems) => {
    if (!appliedCoupon) return;

    const { subtotal } = calculateOrderDetails(currentCartItems, null);
    if (subtotal < appliedCoupon.minOrder || Object.keys(currentCartItems).length === 0) {
      setAppliedCoupon(null);
      toast.info("Coupon removed due to cart changes");
    }
  };

  const applyCoupon = (code) => {
    const coupon = coupons.find(c => c.code === code);
    if (!coupon) {
      toast.error("Invalid coupon");
      return false;
    }

    const { subtotal } = calculateOrderDetails(cartItems, null);
    if (subtotal < coupon.minOrder) {
      const remaining = coupon.minOrder - subtotal;
      toast.error(`Add products worth ${currency}${remaining.toFixed(2)} more to apply this coupon`);
      return false;
    }

    setAppliedCoupon(coupon);
    toast.success("Coupon applied successfully!");
    return true;
  };

  const clearCart = () => {
    setCartItems({});
    setAppliedCoupon(null);
  };

  const value = {
    products,
    currency,
    deliveryFee,
    MIN_ORDER_VALUE,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateItemQuantity,
    removeItem,
    confirmDelete,
    setConfirmDelete,
    coupons,
    appliedCoupon,
    applyCoupon,
    calculateOrderDetails,
    clearCart
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;