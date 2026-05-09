import { NavLink } from "react-router-dom"
import {MdCategory, MdContacts, MdHomeFilled, MdShop2} from "react-icons/md"
 
const Navbar = ({ containerStyles }) => {
  return (
    <nav className={containerStyles}>
      <NavLink to={'/'} className={({isActive}) => isActive ? "active_link" : ""}> <div className="flexCenter gap-x-1"><MdHomeFilled />Home</div></NavLink>
      <NavLink to={'/dairy'} className={({isActive}) => isActive ? "active_link" : ""}> <div className="flexCenter gap-x-1"><MdCategory />Dairy-Products</div></NavLink>
      <NavLink to={'/vegetables'} className={({isActive}) => isActive ? "active_link" : ""}> <div className="flexCenter gap-x-1"><MdShop2 />Vegetables</div></NavLink>
      <NavLink to={'/grains'} className={({isActive}) => isActive ? "active_link" : ""}> <div className="flexCenter gap-x-1"><MdContacts />Millets and Grains</div></NavLink>
    </nav>
  )
}

export default Navbar
