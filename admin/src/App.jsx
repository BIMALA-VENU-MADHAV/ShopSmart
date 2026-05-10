import {Routes,Route,Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

export default function App(){

  const isAdmin=localStorage.getItem("admin-auth");

  return(
    <main className="bg-primary text-tertiary min-h-screen">

      {isAdmin && <Navbar />}

      <div className={isAdmin ? "pt-20" : ""}>

        <Routes>

          <Route
            path="/"
            element={
              isAdmin
              ? <Navigate to="/addproduct" />
              : <AdminLogin />
            }
          />

          <Route
            path="/*"
            element={
              isAdmin
              ? <Admin />
              : <Navigate to="/" />
            }
          />

        </Routes>

      </div>

    </main>
  )
}