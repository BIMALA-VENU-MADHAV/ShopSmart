import { useEffect, useState } from "react";
import Item from "./Item";

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/popularproducts`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <section className="bg-primary py-16 sm:py-20">

      <div className="max_padd_container">

        {/* HEADING */}
        <div className="text-center mb-12">

          <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Popular Products
          </span>

          <h2 className="text-[30px] sm:text-[42px] font-bold text-tertiary">
            Dairy Products
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Explore fresh and healthy dairy essentials loved by thousands of customers.
          </p>

        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-7">

          {popularProducts.map((item) => (
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

      </div>

    </section>
  );
};

export default Popular;