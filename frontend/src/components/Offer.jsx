import { NavLink } from "react-router-dom";
import banneroffer from "../assets/banneroffer.png";

const Offer = () => {
  return (
    <section className="bg-primary py-16 sm:py-20">

      <div className="max_padd_container">

        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] min-h-[350px] sm:min-h-[420px] flex items-center">

          {/* BACKGROUND IMAGE */}
          <img
            src={banneroffer}
            alt="Offer Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* LIGHT OVERLAY */}
          <div className="absolute inset-0 "></div>

          {/* CONTENT */}
          <div className="relative z-10 px-6 sm:px-12 lg:px-20 py-12 max-w-[40rem]">

            <span className="inline-block bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Limited Time Offer
            </span>

            <h2 className="text-[32px] sm:text-[48px] font-bold text-black mt-6 leading-tight">
              Get 10% Discount On Fresh Vegetables 🥬
            </h2>

            <p className="text-gray-800 mt-5 text-sm sm:text-base leading-7">
              Discover farm-fresh vegetables and healthy groceries delivered right to your doorstep.
            </p>

            <NavLink
              to="/vegetables"
              className="inline-flex items-center justify-center mt-8 btn_secondary_rounded shadow-xl hover:scale-105 transition-all duration-300"
            >
              Shop Vegetables
            </NavLink>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Offer;