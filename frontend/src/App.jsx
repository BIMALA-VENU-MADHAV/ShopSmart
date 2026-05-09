import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

import bannerdairy from "./assets/bannerdairy.png";
import bannervegi from "./assets/bannervegi.png";
import bannergrains from "./assets/bannergrains.png";

export default function App() {

  return (

    <main className="bg-primary text-tertiary min-h-screen overflow-hidden">

      <BrowserRouter>

        <Header />

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* CATEGORY */}
          <Route
            path="/dairy"
            element={
              <Category
                category="dairy"
                banner={bannerdairy}
              />
            }
          />

          <Route
            path="/vegetables"
            element={
              <Category
                category="vegetables"
                banner={bannervegi}
              />
            }
          />

          <Route
            path="/grains"
            element={
              <Category
                category="grains"
                banner={bannergrains}
              />
            }
          />

          {/* PRODUCT */}
          <Route
            path="/product/:productId"
            element={<Product />}
          />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

        </Routes>

        <Footer />

      </BrowserRouter>

    </main>
  );
}