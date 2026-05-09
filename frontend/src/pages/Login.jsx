import { useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";

const Login = () => {

  const [state, setState] = useState("Login");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  /* INPUT CHANGE */
  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* LOGIN */
  const login = async () => {

    try {

      setLoading(true);

      let responseData;

      await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      )
        .then((response) => response.json())
        .then((data) => (responseData = data));

      if (responseData.success) {

        localStorage.setItem(
          "auth-token",
          responseData.token
        );

        window.location.replace("/");

      } else {

        alert(responseData.errors);
      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    } finally {

      setLoading(false);
    }
  };

  /* SIGNUP */
  const signup = async () => {

    try {

      setLoading(true);

      let responseData;

      await fetch(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      )
        .then((response) => response.json())
        .then((data) => (responseData = data));

      if (responseData.success) {

        localStorage.setItem(
          "auth-token",
          responseData.token
        );

        window.location.replace("/");

      } else {

        alert(responseData.errors);
      }

    } catch (error) {

      console.log(error);

      alert("Signup Failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <section className="min-h-screen flexCenter bg-primary px-4 pt-24 pb-16">

      <div className="w-full max-w-[480px] bg-white rounded-[32px] shadow-2xl overflow-hidden">

        {/* TOP */}
        <div className="bg-secondary px-8 py-10 text-center">

          <h2 className="text-[34px] font-bold text-white">
            {state}
          </h2>

          <p className="text-white/80 mt-2">
            Welcome to ShopSmart
          </p>

        </div>

        {/* FORM */}
        <div className="p-8 sm:p-10">

          <div className="flex flex-col gap-5">

            {/* USERNAME */}
            {state === "Sign Up" && (

              <div className="flex items-center bg-primary rounded-2xl px-5 h-14 border border-transparent focus-within:border-secondary transition-all duration-300">

                <FaUser className="text-gray-400" />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  placeholder="Full Name"
                  className="w-full bg-transparent outline-none pl-4 text-sm"
                />

              </div>
            )}

            {/* EMAIL */}
            <div className="flex items-center bg-primary rounded-2xl px-5 h-14 border border-transparent focus-within:border-secondary transition-all duration-300">

              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Email Address"
                className="w-full bg-transparent outline-none pl-4 text-sm"
              />

            </div>

            {/* PASSWORD */}
            <div className="flex items-center bg-primary rounded-2xl px-5 h-14 border border-transparent focus-within:border-secondary transition-all duration-300">

              <FaLock className="text-gray-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="Password"
                className="w-full bg-transparent outline-none pl-4 text-sm"
              />

            </div>

          </div>

          {/* TERMS */}
          <div className="flex items-start gap-3 mt-6">

            <input
              type="checkbox"
              className="mt-1 accent-secondary"
            />

            <p className="text-sm text-gray-500 leading-6">
              By continuing, I agree to the terms of use
              and privacy policy.
            </p>

          </div>

          {/* BUTTON */}
          <button
            onClick={() =>
              state === "Login"
                ? login()
                : signup()
            }
            disabled={loading}
            className="w-full bg-secondary hover:bg-[#ff6b1c] text-white font-semibold py-4 rounded-2xl mt-8 transition-all duration-300 shadow-lg hover:shadow-xl"
          >

            {loading
              ? "Please Wait..."
              : state === "Login"
              ? "Login"
              : "Create Account"}

          </button>

          {/* TOGGLE */}
          <div className="text-center mt-8">

            {state === "Sign Up" ? (

              <p className="text-gray-500">

                Already have an account?{" "}

                <span
                  onClick={() => setState("Login")}
                  className="text-secondary font-semibold cursor-pointer hover:underline"
                >

                  Login

                </span>

              </p>

            ) : (

              <p className="text-gray-500">

                Don’t have an account?{" "}

                <span
                  onClick={() =>
                    setState("Sign Up")
                  }
                  className="text-secondary font-semibold cursor-pointer hover:underline"
                >

                  Create One

                </span>

              </p>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Login;