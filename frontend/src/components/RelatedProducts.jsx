import POPULAR from "../assets/popular";
import Item from "./Item";

const RelatedProducts = () => {
  return (
    <section className="bg-primary py-16 sm:py-20">

      <div className="max_padd_container">

        {/* HEADING */}
        <div className="text-center mb-12">

          <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            You May Like
          </span>

          <h2 className="text-[30px] sm:text-[42px] font-bold text-tertiary">
            Related Products
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Explore more fresh grocery products carefully selected for you.
          </p>

        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-7">

          {POPULAR.map((item) => (
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

export default RelatedProducts;