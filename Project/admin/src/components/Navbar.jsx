import logo from '../assets/logo.svg';
import profileImg from '../assets/profile.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white py-2 px-4 ring-1 ring-slate-900/5">
      {/* Logo */}
       <div>
           <Link className="font-bold text-[22px] text-secondary ">ShopSmart</Link>
          </div>

      {/* Title */}
      <div className="uppercase font-bold text-white bg-secondary px-4 py-2 rounded-md tracking-widest text-[20px]">
        Admin Panel
      </div>

      {/* Profile Image */}
      <div>
        <img src={profileImg} alt="Profile" className="h-12 w-12 rounded-full" />
      </div>
    </nav>
  );
};

export default Navbar;
