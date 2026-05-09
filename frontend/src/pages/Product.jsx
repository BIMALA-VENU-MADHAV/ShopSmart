import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";

import ProductHd from "../components/ProductHd";
import ProductDisplay from "../components/ProductDisplay";
import ProductDescription from "../components/ProductDescription";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {

  const { all_products } = useContext(ShopContext);

  const { productId } = useParams();

  const product = all_products.find(
    (e) => e.id === Number(productId)
  );

  /* LOADING */
  if (all_products.length === 0) {
    return (
      <section className="min-h-screen flexCenter">
        <h2 className="text-xl font-semibold text-gray-600">
          Loading Product...
        </h2>
      </section>
    );
  }

  /* PRODUCT NOT FOUND */
  if (!product) {
    return (
      <section className="min-h-screen flexCenter">
        <div className="text-center">

          <h2 className="text-3xl font-bold text-tertiary">
            Product Not Found
          </h2>

          <p className="text-gray-500 mt-3">
            The product you are looking for does not exist.
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className="max_padd_container pt-28 pb-16">

      <ProductHd product={product} />

      <ProductDisplay product={product} />

      <ProductDescription />

      <RelatedProducts />

    </section>
  );
};

export default Product;