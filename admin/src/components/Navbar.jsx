import profileImg from "../assets/profile.png";
import { Link } from "react-router-dom";

const Navbar=()=>{

  const logout=()=>{

    localStorage.removeItem("admin-auth");

    window.location.replace("/");
  };

  return(

    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 shadow-sm">

      <nav className="max-w-[1600px] mx-auto h-20 px-4 sm:px-8 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/addproduct"
          className="text-[24px] sm:text-[28px] font-bold text-secondary tracking-wide"
        >
          ShopSmart
        </Link>

        {/* TITLE */}
        <div className="hidden sm:flex items-center gap-3 bg-secondary text-white px-5 py-2 rounded-full shadow-md">

          <span className="uppercase font-semibold tracking-[2px] text-sm lg:text-base">
            Admin Panel
          </span>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
          >
            Logout
          </button>

          <div className="hidden md:flex flex-col items-end">

            <span className="text-sm font-semibold text-tertiary">
              Admin
            </span>

            <span className="text-xs text-gray-500">
              Shop Manager
            </span>

          </div>

          <img
            src={profileImg}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-secondary shadow-md"
          />

        </div>

      </nav>

    </header>
  );
};

export default Navbar;