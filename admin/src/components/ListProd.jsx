import { useEffect, useState } from "react";

import { TbTrash } from "react-icons/tb";

import { MdInventory2 } from "react-icons/md";

const ListProd = () => {

  const [allProducts, setAllProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  /* FETCH PRODUCTS */
  const fetchInfo = async () => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/allproducts`
      );

      const data = await response.json();

      setAllProducts(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchInfo();

  }, []);

  /* REMOVE PRODUCT */
  const remove_product = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    await fetch(
      `${import.meta.env.VITE_API_URL}/removeproduct`,
      {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id }),
      }
    );

    fetchInfo();
  };

  return (

    <section className="w-full">

      <div className="bg-white rounded-[30px] shadow-md p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <h2 className="text-[28px] sm:text-[36px] font-bold text-tertiary">
              Product List
            </h2>

            <p className="text-gray-500 mt-1">
              Manage all grocery products.
            </p>

          </div>

          {/* COUNT */}
          <div className="flex items-center gap-3 bg-primary px-5 py-3 rounded-2xl w-fit">

            <MdInventory2 className="text-secondary text-2xl" />

            <span className="font-semibold text-tertiary">
              {allProducts.length} Products
            </span>

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">

          <table className="w-full min-w-[800px]">

            <thead className="bg-primary">

              <tr className="text-left text-tertiary">

                <th className="p-5 font-semibold">
                  Product
                </th>

                <th className="p-5 font-semibold">
                  Name
                </th>

                <th className="p-5 font-semibold">
                  Old Price
                </th>

                <th className="p-5 font-semibold">
                  New Price
                </th>

                <th className="p-5 font-semibold">
                  Category
                </th>

                <th className="p-5 font-semibold text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >

                    Loading Products...

                  </td>

                </tr>

              ) : allProducts.length > 0 ? (

                allProducts.map((product, i) => (

                  <tr
                    key={i}
                    className="border-t border-slate-200 hover:bg-slate-50 transition-all duration-200"
                  >

                    {/* IMAGE */}
                    <td className="p-4">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                      />

                    </td>

                    {/* NAME */}
                    <td className="p-4">

                      <div className="font-semibold text-tertiary line-clamp-2">
                        {product.name}
                      </div>

                    </td>

                    {/* OLD PRICE */}
                    <td className="p-4 text-gray-500 line-through">
                      ₹{product.old_price}
                    </td>

                    {/* NEW PRICE */}
                    <td className="p-4 font-bold text-secondary">
                      ₹{product.new_price}
                    </td>

                    {/* CATEGORY */}
                    <td className="p-4 capitalize">
                      {product.category}
                    </td>

                    {/* DELETE */}
                    <td className="p-4">

                      <div className="flex justify-center">

                        <button
                          onClick={() =>
                            remove_product(product.id)
                          }
                          className="bg-red-100 hover:bg-red-500 hover:text-white text-red-600 p-3 rounded-full transition-all duration-300"
                        >

                          <TbTrash className="text-xl" />

                        </button>

                      </div>

                    </td>

                  </tr>
                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >

                    No Products Found

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
};

export default ListProd;