import listProduct from "../assets/productlist.png";
import addProduct from "../assets/addproduct.png";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

  return (

    <aside className="bg-white lg:w-[270px] lg:min-h-[calc(100vh-80px)] shadow-md border-r border-slate-200">

      <div className="flex lg:flex-col gap-4 p-4 lg:p-6 sticky top-20">

        {/* ADD PRODUCT */}
        <NavLink
          to="/addproduct"
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-300 ${
              isActive
                ? "bg-secondary text-white shadow-lg"
                : "bg-primary hover:bg-secondary hover:text-white"
            }`
          }
        >

          <img
            src={addProduct}
            alt="addProduct"
            className="w-10 h-10 object-contain"
          />

          <span className="font-semibold text-sm sm:text-base">
            Add Product
          </span>

        </NavLink>

        {/* PRODUCT LIST */}
        <NavLink
          to="/listproduct"
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-300 ${
              isActive
                ? "bg-secondary text-white shadow-lg"
                : "bg-primary hover:bg-secondary hover:text-white"
            }`
          }
        >

          <img
            src={listProduct}
            alt="productList"
            className="w-10 h-10 object-contain"
          />

          <span className="font-semibold text-sm sm:text-base">
            Product List
          </span>

        </NavLink>

      </div>

    </aside>
  );
};

export default Sidebar;