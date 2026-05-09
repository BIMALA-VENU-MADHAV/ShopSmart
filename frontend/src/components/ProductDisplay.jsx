import { useContext, useState } from "react";
import { MdStar } from "react-icons/md";

import product_rt_1 from "../assets/product_rt_1.png";
import product_rt_2 from "../assets/product_rt_2.png";
import product_rt_3 from "../assets/product_rt_3.png";
import product_rt_4 from "../assets/product_rt_4.png";

import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = ({ product }) => {

  const { addToCart } = useContext(ShopContext);

  const productImages = [
    product.image,
    product_rt_1,
    product_rt_2,
    product_rt_3,
    product_rt_4,
  ];

  const [mainImage, setMainImage] = useState(product.image);

  return (
    <section className="py-6">

      <div className="flex flex-col xl:flex-row gap-12 xl:gap-16">

        {/* LEFT */}
        <div className="flex flex-col-reverse md:flex-row gap-4 flex-1">

          {/* THUMBNAILS */}
          <div className="flex md:flex-col gap-3 overflow-x-auto">

            {productImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 min-w-[80px] ${
                  mainImage === img
                    ? "border-secondary"
                    : "border-slate-200"
                }`}
              >

                <img
                  src={img}
                  alt="productImg"
                  className="w-20 h-20 object-cover"
                />

              </div>
            ))}

          </div>

          {/* MAIN IMAGE */}
          <div className="flex-1 bg-white rounded-[30px] p-4 shadow-md">

            <img
              src={mainImage}
              alt={product.name}
              className="w-full max-h-[550px] object-contain rounded-[20px]"
            />

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex-1">

          <h1 className="text-[28px] sm:text-[38px] font-bold text-tertiary leading-tight">
            {product.name}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-3 mt-5">

            <div className="flex items-center gap-1 text-secondary text-xl">
              <MdStar />
              <MdStar />
              <MdStar />
              <MdStar />
              <MdStar />
            </div>

            <p className="text-gray-500 text-sm">
              (111 Reviews)
            </p>

          </div>

          {/* PRICE */}
          <div className="flex items-center gap-5 mt-6">

            <span className="text-gray-400 line-through text-lg">
              ₹{product.old_price}
            </span>

            <span className="text-secondary text-[30px] font-bold">
              ₹{product.new_price}
            </span>

          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-6 leading-7 text-sm sm:text-base">
            ShopSmart delivers fresh and premium grocery essentials with fast delivery,
            reliable quality, and a seamless shopping experience.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button
              onClick={() => addToCart(product.id)}
              className="btn_dark_outline uppercase tracking-wider shadow-md hover:scale-105 transition-all duration-300"
            >
              Add To Cart
            </button>

            <button className="btn_secondary_rounded uppercase tracking-wider shadow-lg hover:scale-105 transition-all duration-300">
              Buy Now
            </button>

          </div>

          {/* CATEGORY */}
          <div className="mt-8 border-t border-slate-200 pt-6">

            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold text-tertiary">
                Category :
              </span>{" "}
              {product.category}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProductDisplay;