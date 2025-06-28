import { BrowserRouter,Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Product from "./pages/Product";
import bannerdairy from "./assets/bannerdairy.png";
import bannervegi from "./assets/bannervegi.png";
import bannergrains from "./assets/bannergrains.png";
import Cart from "./pages/Cart";

export default function App() {
  return  (
    <main className="bg-primary text-tertiary">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dairy" element={<Category category="dairy" banner={bannerdairy} />} />
        <Route path="/vegetables" element={<Category category="vegetables" banner={bannervegi} />} />
        <Route path="/grains" element={<Category category="grains" banner={bannergrains} />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />}/>
        </Route>
        <Route path="/cart-page" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      <Footer />
      </BrowserRouter>
    </main>
  )
}
