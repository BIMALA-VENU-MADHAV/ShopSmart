import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Item from "../components/Item";

import { useContext, useState } from "react";

import { ShopContext } from "../Context/ShopContext";

const Category = ({ category, banner }) => {

  const { all_products } = useContext(ShopContext);

  const [sortType, setSortType] = useState("default");

  /* FILTER PRODUCTS */
  let filteredProducts = all_products.filter(
    (item) => item.category === category
  );

  /* SORT PRODUCTS */
  if (sortType === "low") {

    filteredProducts.sort(
      (a, b) => a.new_price - b.new_price
    );

  } else if (sortType === "high") {

    filteredProducts.sort(
      (a, b) => b.new_price - a.new_price
    );
  }

  return (

    <section className="max_padd_container pt-28 pb-16">

      {/* BANNER */}
      <div className="overflow-hidden rounded-[30px] shadow-lg">

        <img
          src={banner}
          alt="categoryBanner"
          className="w-full h-[180px] sm:h-[240px] md:h-[320px] object-cover"
        />

      </div>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 my-10">

        {/* PRODUCTS COUNT */}
        <h5 className="text-gray-600 text-sm sm:text-base">

          Showing

          <span className="font-bold text-tertiary mx-1">
            {filteredProducts.length}
          </span>

          products

        </h5>

        {/* SORT */}
        <div className="relative">

          <select
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value)
            }
            className="appearance-none bg-white border border-slate-200 rounded-full px-5 py-3 pr-12 text-sm font-medium outline-none shadow-sm hover:border-secondary transition-all duration-300"
          >

            <option value="default">
              Sort By
            </option>

            <option value="low">
              Price: Low To High
            </option>

            <option value="high">
              Price: High To Low
            </option>

          </select>

          <MdOutlineKeyboardArrowDown className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-gray-500 pointer-events-none" />

        </div>

      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">

        {filteredProducts.map((item) => (

          <Item
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
          />

        ))}

      </div>

      {/* EMPTY */}
      {filteredProducts.length === 0 && (

        <div className="text-center py-24">

          <h3 className="text-2xl font-bold text-gray-400">
            No Products Found
          </h3>

        </div>
      )}

      {/* LOAD MORE */}
      <div className="mt-16 flexCenter">

        <button className="btn_secondary_rounded shadow-lg hover:scale-105 transition-all duration-300">

          Load More

        </button>

      </div>

    </section>
  );
};

export default Category;