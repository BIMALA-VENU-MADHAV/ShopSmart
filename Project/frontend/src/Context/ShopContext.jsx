import { useEffect } from "react";
import { createContext, useState } from "react";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart={};
    for (let index = 0; index <  300+1 ; index++) {
      cart[index]=0;
      
    }
    return cart;
  }

const ShopContextProvider = (props) => {

  const [cartItems,setCartItems] =useState(getDefaultCart());
  const [all_products,setAll_products] = useState([]);

  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/allproducts`).then((response) => response.json()).then((data) => setAll_products(data));

  if (localStorage.getItem('auth-token')) {
    fetch(`${import.meta.env.VITE_API_URL}/getcart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json',
      },
      body: "", 
    })
      .then((response) => response.json())
      .then((data) => setCartItems(data));
  }
}, []);


  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
    if(localStorage.getItem('auth-token')){
      fetch(`${import.meta.env.VITE_API_URL}/addtocart` , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId": itemId}),
      }).then((response) => response.json()).then((data) => console.log(data));
    }
  }
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token')){
      fetch(`${import.meta.env.VITE_API_URL}/removefromcart` , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId": itemId}),
      }).then((response) => response.json()).then((data) => console.log(data));
    }
  }

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

  const getTotalCartItems = () => {
    let totalItems =0;
    for (const item in cartItems) {
      if(cartItems[item] >0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems; 
  }
  
  const contextValue = {getTotalCartItems, getTotalCartAmount, all_products ,cartItems ,addToCart,removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
