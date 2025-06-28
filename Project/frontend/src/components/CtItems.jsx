import  { useContext } from 'react'
import { ShopContext } from "../Context/ShopContext"
import { TbTrash } from 'react-icons/tb'

const CtItems = () => {


  const loadRazorpay = () => {
  fetch("http://localhost:4000/createOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: getTotalCartAmount() }),
  })
    .then((res) => res.json())
    .then((data) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: data.key, 
          amount: getTotalCartAmount() * 100,
          currency: "INR",
          name: "ShopSmart",
          description: "Complete your purchase",
          handler: function (response) {
            alert("Payment Successful, ID: " + response.razorpay_payment_id);
          },
          prefill: {
            name: "Bimala Venu Madhav",
            email: "venubimala1234@gmail.com",
            contact: "8142226617",
          },
          theme: {
            color: "#121212",
          },
          method: {
            upi: true,
            card: true,
            netbanking: true,
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    })
    .catch((err) => {
      console.error("Failed to load Razorpay:", err);
      alert("Unable to load Razorpay. Try again.");
    });
};






  const { getTotalCartItems, getTotalCartAmount,all_products, cartItems, removeFromCart } = useContext(ShopContext)

  return (
    <section className='max_padd_container pt-28'>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className='bg-slate-900/10 regular-18 sm:regular-22 text-start py-12'>
            <th className='p-1 py-2'>Products</th>
            <th className='p-1 py-2'>Title</th>
            <th className='p-1 py-2'>Price</th>
            <th className='p-1 py-2'>Quantity</th>
            <th className='p-1 py-2'>Total</th>
            <th className='p-1 py-2'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {all_products.map((product) => {
            const quantity = cartItems[product.id]
            if (quantity > 0) {
              const total = quantity * product.new_price
              return (
                <tr key={product.id} className='border-b border-slate-900/20 p-6 medium-14 text-center'>
                  <td className='flexCenter'>
                    <img src={product.image} alt="prdctImg" height={43} width={43} className='rounded-lg ring-1 ring-slate-900/5 my-1' />
                  </td>
                  <td className='p-2'>{product.name}</td>
                  <td className='p-2'>₹{product.new_price}</td>
                  <td className='w-16 h-16 p-2 bg-white'>{quantity}</td>
                  <td className='p-2'>₹{total}</td>
                  <td className='p-2'>
                    <button onClick={() => removeFromCart(product.id)} className='text-red-500 hover:text-red-700'>
                      <TbTrash />
                    </button>
                  </td>
                </tr>
              )
            }
            return null
          })}
        </tbody>
      </table>
      <div className='flex flex-col gap-20 my-16 p-8 md:flex-row rounded-md bg-white w-full max-w-[666px]'>
        <div className='flex flex-col gap-10'>
            <h4 className='bold-20'>Summary</h4>
            <div>
                <div className='flexBetween py-4'>
                    <h4 className='medium-16'>Subtotal:</h4>
                    <h4 className='text-gray-30 font-semibold'>₹{getTotalCartAmount()}</h4>
                </div>
                <hr />
                <div className='flexBetween py-4'>
                    <h4 className='medium-16'>Shipping Fee:</h4>
                    <h4  className='text-gray-30 font-semibold'>Free</h4>
                </div>
                <hr />
                <div className='flexBetween py-4'>
                    <h4 className='bold-18'>Total</h4>
                    <h4 className='bold-18'>₹{getTotalCartAmount()}</h4>
                </div>
            </div>
            <button className='btn_dark_rounded w-44' onClick={loadRazorpay}>Checkout</button>
            <div className='flex flex-col gap-10'>
                <h4 className='bold-20 capitalize'>Enter your coupon here:</h4>
                <div className='flexBetween pl-5 h-12 bg-primary rounded-full ring-1 ring-slate-900/10'>
                    <input type="text" placeholder='Coupon code' className='bg-transparent border-none outline-none' />
                    <button className='btn_dark_rounded'>Submit</button>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default CtItems;
