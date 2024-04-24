import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@tremor/react";
import { RiLogoutBoxLine } from "@remixicon/react";

export const Navbar = ({ children }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
    <aside className="bg-gradient-to-t from-grayscale-100 to-grayscale-400 md:hidden z-50 flex justify-center items-center overflow-hidden rounded-t-[10px] shadow-sm w-full">
        <nav className="bg-grayscale-100/25 backdrop-blur-md flex items-center justify-center w-full px-1 opacity-75">
            <ul className="flex gap-1">
                <li className="flex items-center my-1">
                    <button onClick={handleLogout} className="nav-link nav-link-default">
                      <Icon size='sm' icon={RiLogoutBoxLine} color="#FCFCFC"/>
                    </button>
                </li>
                {children}
            </ul>
        </nav>
    </aside>
    </>
  )
}

export const NavbarItem = ({ icon, text, link }) => {
  return (
    <li className="relative flex items-center my-1">
      <NavLink to={link} className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : "nav-link-default"}`}>
        <Icon icon={icon} size="sm" color="#FCFCFC"/>
        <span className="text">{text}</span>
      </NavLink>
    </li>
  )
}