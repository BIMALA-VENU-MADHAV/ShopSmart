import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

/* DEFAULT CART */
const getDefaultCart = () => {

  let cart = {};

  for (let index = 0; index < 301; index++) {
    cart[index] = 0;
  }

  return cart;
};

const ShopContextProvider = (props) => {

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const [all_products, setAll_products] = useState([]);

  const [loading, setLoading] = useState(true);

  /* FETCH PRODUCTS */
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/allproducts`
        );

        const data = await response.json();

        setAll_products(data);

      } catch (error) {

        console.log("Product Fetch Error:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);

  /* FETCH CART */
  useEffect(() => {

    const fetchCart = async () => {

      if (!localStorage.getItem("auth-token")) return;

      try {

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/getcart`,
          {
            method: "POST",

            headers: {
              Accept: "application/json",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },

            body: "",
          }
        );

        const data = await response.json();

        setCartItems(data);

      } catch (error) {

        console.log("Cart Fetch Error:", error);

      }
    };

    fetchCart();

  }, []);

  /* ADD TO CART */
  const addToCart = async (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));

    if (localStorage.getItem("auth-token")) {

      try {

        await fetch(
          `${import.meta.env.VITE_API_URL}/addtocart`,
          {
            method: "POST",

            headers: {
              Accept: "application/json",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              itemId,
            }),
          }
        );

      } catch (error) {

        console.log("Add To Cart Error:", error);

      }
    }
  };

  /* REMOVE FROM CART */
  const removeFromCart = async (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (localStorage.getItem("auth-token")) {

      try {

        await fetch(
          `${import.meta.env.VITE_API_URL}/removefromcart`,
          {
            method: "POST",

            headers: {
              Accept: "application/json",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              itemId,
            }),
          }
        );

      } catch (error) {

        console.log("Remove Cart Error:", error);

      }
    }
  };

  /* TOTAL AMOUNT */
  const getTotalCartAmount = () => {

    let totalAmount = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        const itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );

        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  /* TOTAL ITEMS */
  const getTotalCartItems = () => {

    let totalItems = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }

    return totalItems;
  };

  /* CONTEXT VALUE */
  const contextValue = {
    loading,
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;