import { useRef, useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg"
import logout from "../assets/logout.svg"
import user from "../assets/user.svg"
import Navbar from "./Navbar";
import { FaOpencart } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";

const Header = () => {
    const [menuOpened, setmenuOpened] = useState(false);
    const menuRef = useRef(null);
    const {getTotalCartItems} = useContext(ShopContext);

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
  <header className="fixed top-0 left-0 m-auto max_padd_container w-full bg-white ring-1 ring-slate-900/5 z-10">
   <div className="px-4 flexBetween py-3 max-xs:px-2">
    {/* logo */}
    <div>
     <Link className="text-secondary bold-22 ">ShopSmart</Link>
    </div>

    {/* Navbar desktop */}
    <Navbar containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"} />

    {/* Navbar mobile with ref */}
    <div ref={menuRef}>
     <Navbar
      containerStyles={`${
       menuOpened
        ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 ring-1 ring-slate-900/5 transition-all duration-300 z-50"
        : "hidden"
      } md:hidden`}
     />
    </div>

    {/* buttons */}
    <div className="flex items-center gap-x-3 bold-16">
     <button
      onClick={() => setmenuOpened(!menuOpened)}
      className="md:hidden cursor-pointer rounded-full p-1 hover:text-secondary ring-1 ring-slate-900/30 h-8 w-8 hover:ring-secondary transition-colors"
     >
      ☰
     </button>

     <div className="flexBetween sm:gap-x-6">
      <NavLink to="/cart-page" className="flex">
       <FaOpencart className="p-1 h-8 w-8 ring-slate-900/30 ring-1 rounded-full" />
       <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2">{getTotalCartItems()}</span>
      </NavLink>

      {/* Login/Logout Buttons */}
      {localStorage.getItem('auth-token') ? <NavLink onClick={() => {localStorage.removeItem('auth-token'); window.location.replace("/")}} to={'logout'} className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}><img src={logout} alt="logutIcon" height={19} width={19}/>Logout</NavLink> :
      <NavLink to={'login'} className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}>
       <img src={user} alt="userIcon" height={19} width={19} />Login
      </NavLink> }
      
     </div>
    </div>
   </div>
  </header>
 );
};

export default Header;
