import { NavLink } from "react-router-dom";

import {
  MdHomeFilled,
  MdLocalGroceryStore,
  MdEco,
  MdGrain,
} from "react-icons/md";

const Navbar = ({ containerStyles }) => {

  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "active_link flex items-center gap-x-2"
      : "flex items-center gap-x-2 text-gray-700 hover:text-secondary transition-all duration-300";

  return (
    <nav className={containerStyles}>

      <NavLink
        to="/"
        className={navLinkStyles}
      >
        <MdHomeFilled className="text-[20px]" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/dairy"
        className={navLinkStyles}
      >
        <MdLocalGroceryStore className="text-[20px]" />
        <span>Dairy</span>
      </NavLink>

      <NavLink
        to="/vegetables"
        className={navLinkStyles}
      >
        <MdEco className="text-[20px]" />
        <span>Vegetables</span>
      </NavLink>

      <NavLink
        to="/grains"
        className={navLinkStyles}
      >
        <MdGrain className="text-[20px]" />
        <span>Grains</span>
      </NavLink>

    </nav>
  );
};

export default Navbar;