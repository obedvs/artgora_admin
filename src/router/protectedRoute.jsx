import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RiCalendarEventLine, RiGroupFill, RiHome2Fill, RiImageAddFill, RiSettings3Fill } from "@remixicon/react";
import { Loading } from "../components/loading";
import { Navbar, NavbarItem } from "../components/navbar";
import { Sidebar, SidebarItem } from "../components/sidebar";


export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('userId');
  const [ isloading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (isAuthenticated === null) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  if (isloading) {return <Loading />}
  else {
    return (
      <main className="md:flex-row flex flex-col w-full h-screen">
        <Sidebar >
          <SidebarItem icon={RiHome2Fill} text="Inicio" link='inicio' />
          <SidebarItem icon={RiGroupFill} text="Expositores" alert link='expositores' />
          <SidebarItem icon={RiImageAddFill} text="Imágenes" alert link='imagenes' />
          <SidebarItem icon={RiCalendarEventLine} text="Eventos" alert link='eventos' />
          {/* <SidebarItem icon={<FaPenToSquare size={20} />} text="Noticias" alert /> */}
          <hr className="my-3" />
          <SidebarItem icon={RiSettings3Fill} text="Configuración" link='config'/>
        </Sidebar>
        <section className='w-full h-full overflow-y-auto'>
          <Outlet />
        </section>
        <Navbar >
          <NavbarItem icon={RiSettings3Fill} text="Configuración" link='config'/>
          <NavbarItem icon={RiHome2Fill} text="Inicio" link='inicio' />
          <NavbarItem icon={RiGroupFill} text="Expositores" link='expositores' />
          <NavbarItem icon={RiImageAddFill} text="Imágenes" link='imagenes' />
          <NavbarItem icon={RiCalendarEventLine} text="Eventos" link='eventos' />
        </Navbar>
      </main>
    )
  }
};