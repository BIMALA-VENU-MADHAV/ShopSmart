import { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";

const AdminLogin = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {

    try {

      setLoading(true);

      if (
        formData.email === import.meta.env.VITE_ADMIN_EMAIL &&
        formData.password === import.meta.env.VITE_ADMIN_PASSWORD
      ) {

        localStorage.setItem("admin-auth", "true");

        window.location.replace("/addproduct");

      }
      else {

        alert("Invalid Admin Credentials");
      }

    }
    catch (error) {

      console.log(error);

      alert("Login Failed");
    }
    finally {

      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-primary flex items-center justify-center px-4">

      <div className="w-full max-w-[450px] bg-white rounded-[35px] shadow-xl p-8 sm:p-10">

        {/* LOGO */}
        <div className="text-center mb-10">

          <h1 className="text-[38px] font-bold text-secondary">
            ShopSmart
          </h1>

          <p className="text-gray-500 mt-2">
            Admin Panel Login
          </p>

        </div>

        {/* EMAIL */}
        <div className="mb-5">

          <label className="font-semibold text-tertiary mb-3 block">
            Email
          </label>

          <div className="flex items-center bg-primary border border-slate-200 rounded-2xl px-4">

            <MdEmail className="text-gray-500 text-xl" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Enter admin email"
              className="w-full bg-transparent outline-none px-3 py-4"
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div className="mb-8">

          <label className="font-semibold text-tertiary mb-3 block">
            Password
          </label>

          <div className="flex items-center bg-primary border border-slate-200 rounded-2xl px-4">

            <MdLock className="text-gray-500 text-xl" />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter password"
              className="w-full bg-transparent outline-none px-3 py-4"
            />

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-secondary hover:bg-[#ff6b1c] text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg"
        >

          {loading ? "Signing In..." : "Login"}

        </button>


      </div>

    </section>
  );
};

export default AdminLogin;