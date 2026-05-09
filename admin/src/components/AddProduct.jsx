import { useState } from "react";

import upload_area from "../assets/upload_area.svg";

import { MdAdd } from "react-icons/md";

import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {

  const [image, setImage] = useState(false);

  const [loading, setLoading] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "dairy",
    new_price: "",
    old_price: "",
  });

  /* IMAGE */
  const imageHandler = (e) => {

    setImage(e.target.files[0]);
  };

  /* INPUT */
  const changeHandler = (e) => {

    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  /* ADD PRODUCT */
  const Add_Product = async () => {

    try {

      setLoading(true);

      let responseData;

      let product = productDetails;

      let formData = new FormData();

      formData.append("product", image);

      await fetch(
        `${import.meta.env.VITE_API_URL}/upload`,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
          },

          body: formData,
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });

      if (responseData.success) {

        product.image = responseData.image_url;

        await fetch(
          `${import.meta.env.VITE_API_URL}/addproduct`,
          {
            method: "POST",

            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },

            body: JSON.stringify(product),
          }
        )
          .then((resp) => resp.json())
          .then((data) => {

            if (data.success) {

              alert("✅ Product Added");

              setProductDetails({
                name: "",
                image: "",
                category: "dairy",
                new_price: "",
                old_price: "",
              });

              setImage(false);

            } else {

              alert("❌ Upload Failed");
            }
          });
      }

    } catch (error) {

      console.log(error);

      alert("Something Went Wrong");

    } finally {

      setLoading(false);
    }
  };

  return (

    <section className="w-full">

      <div className="bg-white rounded-[30px] shadow-md p-6 sm:p-8 lg:p-10 max-w-[900px]">

        {/* TITLE */}
        <div className="mb-10">

          <h2 className="text-[30px] sm:text-[38px] font-bold text-tertiary">
            Add Product
          </h2>

          <p className="text-gray-500 mt-2">
            Upload grocery products to your store.
          </p>

        </div>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="flex flex-col gap-6">

            {/* NAME */}
            <div>

              <label className="font-semibold text-tertiary block mb-3">
                Product Name
              </label>

              <input
                value={productDetails.name}
                onChange={changeHandler}
                type="text"
                name="name"
                placeholder="Enter product name"
                className="w-full bg-primary border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-secondary transition-all duration-300"
              />

            </div>

            {/* OLD PRICE */}
            <div>

              <label className="font-semibold text-tertiary block mb-3">
                Original Price
              </label>

              <input
                value={productDetails.old_price}
                onChange={changeHandler}
                type="number"
                name="old_price"
                placeholder="Enter original price"
                className="w-full bg-primary border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-secondary transition-all duration-300"
              />

            </div>

            {/* NEW PRICE */}
            <div>

              <label className="font-semibold text-tertiary block mb-3">
                Offer Price
              </label>

              <input
                value={productDetails.new_price}
                onChange={changeHandler}
                type="number"
                name="new_price"
                placeholder="Enter offer price"
                className="w-full bg-primary border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-secondary transition-all duration-300"
              />

            </div>

            {/* CATEGORY */}
            <div>

              <label className="font-semibold text-tertiary block mb-3">
                Category
              </label>

              <select
                value={productDetails.category}
                onChange={changeHandler}
                name="category"
                className="w-full bg-primary border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-secondary transition-all duration-300"
              >

                <option value="dairy">
                  Dairy
                </option>

                <option value="vegetables">
                  Vegetables
                </option>

                <option value="grains">
                  Millets & Grains
                </option>

              </select>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex flex-col">

            <label className="font-semibold text-tertiary block mb-3">
              Product Image
            </label>

            <label
              htmlFor="file-input"
              className="border-2 border-dashed border-slate-300 rounded-[30px] bg-primary min-h-[350px] flex flex-col items-center justify-center cursor-pointer hover:border-secondary transition-all duration-300 overflow-hidden"
            >

              {image ? (

                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="flex flex-col items-center">

                  <FaCloudUploadAlt className="text-6xl text-secondary mb-5" />

                  <img
                    src={upload_area}
                    alt="upload"
                    className="w-24 opacity-70"
                  />

                  <p className="mt-5 text-gray-500 text-sm">
                    Click to upload image
                  </p>

                </div>
              )}

            </label>

            <input
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={Add_Product}
          disabled={loading}
          className="mt-10 bg-secondary hover:bg-[#ff6b1c] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >

          <MdAdd className="text-2xl" />

          {loading
            ? "Uploading..."
            : "Add Product"}

        </button>

      </div>

    </section>
  );
};

export default AddProduct;