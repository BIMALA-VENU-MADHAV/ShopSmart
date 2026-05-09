import { useRef, useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { ShopContext } from "../Context/ShopContext";
import logout from "../assets/logout.svg";
import user from "../assets/user.svg";
import Navbar from "./Navbar";

const Header = () => {

  const [menuOpened, setmenuOpened] = useState(false);

  const menuRef = useRef(null);

  const { getTotalCartItems } = useContext(ShopContext);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setmenuOpened(false);
      }
    };

    if (menuOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [menuOpened]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">

      <div className="max_padd_container">

        <div className="flexBetween h-20">

          {/* LOGO */}
          <Link
            to="/"
            className="bold-28 text-secondary tracking-tight"
          >
            ShopSmart
          </Link>

          {/* DESKTOP NAV */}
          <Navbar
            containerStyles="hidden md:flex items-center gap-x-8 medium-15"
          />

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-x-4">

            {/* CART */}
            <NavLink
              to="/cart"
              className="relative flexCenter w-11 h-11 rounded-full border border-slate-200 bg-white hover:border-secondary hover:text-secondary transition-all duration-300"
            >
              <FaOpencart className="text-2xl" />

              <span className="absolute -top-1 -right-1 flexCenter w-5 h-5 rounded-full bg-secondary text-white text-[11px] font-bold">
                {getTotalCartItems()}
              </span>
            </NavLink>

            {/* LOGIN / LOGOUT */}
            {localStorage.getItem("auth-token") ? (

              <NavLink
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.location.replace("/");
                }}
                to="/"
                className="hidden sm:flex items-center gap-x-2 btn_secondary_rounded"
              >
                <img
                  src={logout}
                  alt="logoutIcon"
                  className="w-4 h-4"
                />
                Logout
              </NavLink>

            ) : (

              <NavLink
                to="/login"
                className="hidden sm:flex items-center gap-x-2 btn_secondary_rounded"
              >
                <img
                  src={user}
                  alt="userIcon"
                  className="w-4 h-4"
                />
                Login
              </NavLink>

            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setmenuOpened(!menuOpened)}
              className="md:hidden flexCenter w-11 h-11 rounded-full border border-slate-200 bg-white hover:border-secondary transition-all duration-300"
            >
              <HiOutlineMenuAlt3 className="text-2xl text-gray-700" />
            </button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      <div ref={menuRef}>

        <div
          className={`${
            menuOpened ? "flex" : "hidden"
          } md:hidden absolute top-24 right-4 flex-col gap-y-6 bg-white shadow-2xl rounded-3xl p-8 min-w-[240px] border border-slate-100`}
        >

          <Navbar
            containerStyles="flex flex-col gap-y-6 medium-15"
          />

          {localStorage.getItem("auth-token") ? (

            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
              className="flexCenter gap-x-2 btn_secondary_rounded"
            >
              <img
                src={logout}
                alt="logoutIcon"
                className="w-4 h-4"
              />
              Logout
            </button>

          ) : (

            <NavLink
              to="/login"
              className="flexCenter gap-x-2 btn_secondary_rounded"
            >
              <img
                src={user}
                alt="userIcon"
                className="w-4 h-4"
              />
              Login
            </NavLink>

          )}

        </div>

      </div>

    </header>
  );
};

export default Header;