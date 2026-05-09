import { NavLink } from "react-router-dom";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import bgecom from "../assets/bgecom.png";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src={bgecom}
        alt="heroBg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* CONTENT */}
      <div className="relative z-10 max_padd_container w-full py-24 sm:py-28">

        <div className="max-w-[38rem] -ml-2 xs:ml-0">

          {/* TAG */}
          <span className="inline-flex items-center gap-x-2 bg-secondary px-3 py-1.5 rounded-full text-white text-[12px] sm:text-[14px] font-semibold mb-5 shadow-lg">
            <MdOutlineLocalOffer className="text-sm sm:text-base" />
            Fresh Grocery Deals
          </span>

          {/* HEADING */}
          <h1 className="text-[28px] xs:text-[34px] sm:text-[48px] md:text-[58px] font-bold leading-tight text-black capitalize max-w-[32rem]">
            Digital Grocery Shopping Hub
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-800 text-[14px] sm:text-[16px] mt-5 max-w-[30rem] leading-6 sm:leading-7">
            ShopSmart brings groceries to your fingertips — fresh, fast,
            and hassle-free with a smart and reliable shopping experience.
          </p>

          {/* REVIEWS */}
          <div className="flex flex-wrap items-center gap-3 mt-7 sm:mt-10">

            <div className="flex items-center gap-x-1 text-yellow-500 text-lg sm:text-xl">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <div className="text-black text-sm sm:text-base">
              <span className="font-bold">176k+</span>

              <span className="ml-2 text-gray-700">
                Excellent Reviews
              </span>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col xs:flex-row gap-3 mt-8 w-full xs:w-fit">

            <NavLink
              to="/vegetables"
              className="btn_secondary_rounded flexCenter text-sm sm:text-base px-5 sm:px-7 py-2.5 sm:py-3 shadow-lg hover:scale-105 transition-all duration-300"
            >
              Shop Now
            </NavLink>

            <NavLink
              to="/dairy"
              className="flexCenter gap-x-2 border border-black/20 bg-white/70 backdrop-blur-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-black text-sm sm:text-base font-semibold hover:bg-white hover:text-secondary transition-all duration-300"
            >
              <MdOutlineLocalOffer className="text-lg sm:text-xl" />
              Offers
            </NavLink>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;