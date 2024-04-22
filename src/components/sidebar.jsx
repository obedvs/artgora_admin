import { createContext, useContext, useState } from "react"
import { RiLogoutBoxLine, RiArrowLeftWideFill, RiArrowRightWideLine } from "@remixicon/react";
import { Icon } from "@tremor/react";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export const Sidebar = ({ children }) => {

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(true)

  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
    <aside className="bg-gradient-to-t from-grayscale-100 to-grayscale-400 h-full">
        <nav className="bg-grayscale-100/25 backdrop-blur-md flex flex-col h-full border-r shadow-sm">
            <div className={`min-h-[76px] flex items-center p-4 rounded-b-md bg-grayscale-100/50 ${expanded ? "justify-between" : "justify-center"}`}>
              <img src="/artgora-logo.png" alt="logo" className={`border-grayscale-500 w-10 h-10 border rounded-full ${expanded ? "" : "hidden"}`} />
              <h1 className={`overflow-hidden transition-all ${expanded ? "" : "hidden"} text-2xl font-semibold`}>ArtGora</h1>
              <button onClick={() => setExpanded((curr) => !curr)} className="bg-grayscale-100 hover:opacity-80 rounded-lg shadow-md">
                  <Icon size="sm" icon={expanded ? RiArrowLeftWideFill : RiArrowRightWideLine} color="#FCFCFC"/>
              </button>
            </div>

            <SidebarContext.Provider value={{ expanded }}>
              <ul className="flex-1 px-3">{children}</ul>
            </SidebarContext.Provider>

            <button onClick={handleLogout} className="group hover:bg-grayscale-200 max-h-10 text-grayscale-500 relative flex items-center px-3 py-2 mx-3 my-1 font-medium transition-colors rounded-md cursor-pointer">
              <Icon size='md' icon={RiLogoutBoxLine} color="#FCFCFC"/>
              <span className={`overflow-hidden transition-all text-start ${expanded ? "w-44 ml-3" : "w-0"}`}>Cerrar Sesión</span>
              {!expanded && (
                  <div className="left-full bg-grayscale-400 text-grayscale-100 opacity-20 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 absolute invisible px-2 py-1 ml-6 text-sm transition-all -translate-x-3 rounded-md">
                      Cerrar Sesión
                  </div>
              )}
            </button>

            <div className="flex justify-center p-3 border-t">
                <div className={`flex justify-center items-center overflow-hidden transition-all ${expanded ? "w-44" : "w-0"} `}>
                    <div className="leading-4">
                        <h4 className="text-grayscale-500 font-semibold">{userName}</h4>
                        <span className="text-grayscale-400 text-xs">{userEmail}</span>
                    </div>
                </div>
            </div>
        </nav>
    </aside>
    </>
  )
}

export const SidebarItem = ({ icon, text, active, alert, link }) => {
  const { expanded } = useContext(SidebarContext)
  return (
    <li>
      <NavLink to={link} 
      className={({isActive, isPending}) => `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
      ${isActive ? "bg-grayscale-500 text-grayscale-200 " : "hover:bg-grayscale-200 text-grayscale-500"}`}>
        <Icon icon={icon} size="sm" color="#FCFCFC"/>
        <span className={`overflow-hidden transition-all ${expanded ? "w-44 ml-3" : "w-0"}`}>{text}</span>
        {alert && (
            <div className={`absolute right-2 w-2 h-2 rounded bg-grayscale-400 ${expanded ? "" : "top-2"}`}>

            </div>
        )}
      </NavLink>

        {!expanded && (
            <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-grayscale-400 text-grayscale-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                {text}
            </div>
        )}
    </li>
  )
}