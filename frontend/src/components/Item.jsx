import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import { BsCartPlus } from "react-icons/bs";

import { useContext } from "react";

import { ShopContext } from "../Context/ShopContext";

const Item = ({
  id,
  name,
  image,
  old_price,
  new_price,
}) => {

  const { addToCart } = useContext(ShopContext);

  return (

    <div className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">

      {/* IMAGE */}
      <Link
        to={`/product/${id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="relative overflow-hidden block"
      >

        {/* SEARCH ICON */}
        <div className="absolute z-20 top-4 right-4 bg-white w-11 h-11 rounded-full flexCenter shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">

          <FaSearch className="text-tertiary group-hover:text-secondary transition-all duration-300" />

        </div>

        <img
          src={image}
          alt={name}
          className="w-full h-[220px] sm:h-[260px] object-cover group-hover:scale-110 transition-all duration-700"
        />

      </Link>

      {/* CONTENT */}
      <div className="p-4 sm:p-5">

        {/* NAME */}
        <Link
          to={`/product/${id}`}
          onClick={() => window.scrollTo(0, 0)}
        >

          <h4 className="text-[15px] sm:text-[17px] font-semibold text-tertiary line-clamp-2 min-h-[52px] hover:text-secondary transition-all duration-300">

            {name}

          </h4>

        </Link>

        {/* PRICE */}
        <div className="flex items-center gap-3 mt-4">

          <span className="text-secondary text-[20px] font-bold">
            ₹{new_price}
          </span>

          <span className="text-gray-400 line-through text-sm">
            ₹{old_price}
          </span>

        </div>

        {/* BUTTON */}
        <button
          onClick={() => addToCart(id)}
          className="mt-5 w-full bg-tertiary hover:bg-secondary text-white py-3 rounded-xl font-medium flexCenter gap-2 transition-all duration-300"
        >

          <BsCartPlus className="text-lg" />

          Add To Cart

        </button>

      </div>

    </div>
  );
};

export default Item;