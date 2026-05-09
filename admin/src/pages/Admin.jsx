import { Routes, Route, Navigate } from "react-router-dom";

import AddProduct from "../components/AddProduct";
import ListProd from "../components/ListProd";
import Sidebar from "../components/Sidebar";

const Admin = () => {

  return (

    <section className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1 p-4 sm:p-6 lg:p-10 overflow-hidden">

        <Routes>

          {/* DEFAULT */}
          <Route
            path="/"
            element={<Navigate to="/addproduct" />}
          />

          {/* ADD PRODUCT */}
          <Route
            path="/addproduct"
            element={<AddProduct />}
          />

          {/* LIST PRODUCT */}
          <Route
            path="/listproduct"
            element={<ListProd />}
          />

        </Routes>

      </div>

    </section>
  );
};

export default Admin;