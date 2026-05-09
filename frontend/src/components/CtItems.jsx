import { useContext } from "react";

import { ShopContext } from "../Context/ShopContext";

import { TbTrash } from "react-icons/tb";

import { FaBagShopping } from "react-icons/fa6";

const CtItems = () => {

  const {
    getTotalCartAmount,
    all_products,
    cartItems,
    removeFromCart,
  } = useContext(ShopContext);

  const BASE_URL = import.meta.env.VITE_API_URL;

  /* RAZORPAY */
  const loadRazorpay = async () => {

    try {

      const response = await fetch(
        `${BASE_URL}/createOrder`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            amount: getTotalCartAmount(),
          }),
        }
      );

      const data = await response.json();

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {

        const options = {

          key: data.key,

          amount: getTotalCartAmount() * 100,

          currency: "INR",

          name: "ShopSmart",

          description: "Complete your purchase",

          order_id: data.order.id,

          handler: function (response) {

            alert(
              `Payment Successful: ${response.razorpay_payment_id}`
            );
          },

          theme: {
            color: "#ff813f",
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.open();
      };

      document.body.appendChild(script);

    } catch (error) {

      console.log(error);

      alert("Failed To Load Razorpay");
    }
  };

  /* CART PRODUCTS */
  const cartProducts = all_products.filter(
    (product) => cartItems[product.id] > 0
  );

  return (

    <section className="pt-28 pb-20">

      <div className="max_padd_container">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">

          <div className="w-14 h-14 rounded-full bg-secondary text-white flexCenter text-2xl shadow-lg">

            <FaBagShopping />

          </div>

          <div>

            <h1 className="text-[32px] sm:text-[42px] font-bold text-tertiary">
              Shopping Cart
            </h1>

            <p className="text-gray-500">
              {cartProducts.length} items added
            </p>

          </div>

        </div>

        {/* EMPTY CART */}
        {cartProducts.length === 0 ? (

          <div className="bg-white rounded-[30px] p-14 text-center shadow-lg">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="emptyCart"
              className="w-28 mx-auto mb-6"
            />

            <h2 className="text-2xl font-bold text-tertiary mb-3">
              Your Cart Is Empty
            </h2>

            <p className="text-gray-500">
              Add some fresh groceries to continue shopping.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-[1fr_400px] gap-10">

            {/* CART ITEMS */}
            <div className="flex flex-col gap-5">

              {cartProducts.map((product) => {

                const quantity = cartItems[product.id];

                return (

                  <div
                    key={product.id}
                    className="bg-white rounded-[30px] p-4 sm:p-6 shadow-md flex flex-col sm:flex-row gap-5 items-center"
                  >

                    {/* IMAGE */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-28 h-28 rounded-2xl object-cover"
                    />

                    {/* DETAILS */}
                    <div className="flex-1 w-full">

                      <div className="flexBetween gap-4">

                        <h3 className="text-lg sm:text-xl font-bold text-tertiary">
                          {product.name}
                        </h3>

                        <button
                          onClick={() =>
                            removeFromCart(product.id)
                          }
                          className="text-red-500 text-xl hover:scale-125 transition-all duration-300"
                        >

                          <TbTrash />

                        </button>

                      </div>

                      <p className="text-gray-500 mt-2 capitalize">
                        {product.category}
                      </p>

                      {/* PRICE */}
                      <div className="flex items-center gap-4 mt-5">

                        <span className="text-secondary text-xl font-bold">
                          ₹{product.new_price}
                        </span>

                        <span className="line-through text-gray-400">
                          ₹{product.old_price}
                        </span>

                      </div>

                    </div>

                    {/* QUANTITY */}
                    <div className="flex flex-col items-center gap-3">

                      <div className="w-12 h-12 rounded-full bg-primary flexCenter font-bold text-lg">
                        {quantity}
                      </div>

                      <span className="font-bold text-secondary">
                        ₹{product.new_price * quantity}
                      </span>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-[30px] shadow-lg p-8 h-fit sticky top-28">

              <h2 className="text-[30px] font-bold text-tertiary mb-8">
                Order Summary
              </h2>

              {/* SUBTOTAL */}
              <div className="flexBetween py-4 border-b border-slate-200">

                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold">
                  ₹{getTotalCartAmount()}
                </span>

              </div>

              {/* SHIPPING */}
              <div className="flexBetween py-4 border-b border-slate-200">

                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="text-green-600 font-semibold">
                  Free
                </span>

              </div>

              {/* TOTAL */}
              <div className="flexBetween py-5">

                <span className="text-xl font-bold">
                  Total
                </span>

                <span className="text-[32px] font-bold text-secondary">
                  ₹{getTotalCartAmount()}
                </span>

              </div>

              {/* CHECKOUT */}
              <button
                onClick={loadRazorpay}
                className="btn_secondary_rounded w-full mt-4 shadow-xl hover:scale-[1.02] transition-all duration-300"
              >

                Proceed To Checkout

              </button>

              {/* COUPON */}
              <div className="mt-10">

                <h4 className="font-semibold text-tertiary mb-4">
                  Apply Coupon
                </h4>

                <div className="flex items-center border border-slate-200 rounded-full overflow-hidden">

                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 px-5 py-4 outline-none bg-transparent text-sm"
                  />

                  <button className="bg-secondary text-white px-6 py-4 font-medium hover:bg-[#ff6b1c] transition-all duration-300">

                    Apply

                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </section>
  );
};

export default CtItems;