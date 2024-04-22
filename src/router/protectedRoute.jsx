import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar, SidebarItem } from "../components/sidebar";
import { Loading } from "../components/loading";
import { RiGroupFill, RiHome2Fill, RiImageAddFill, RiSettings3Fill } from "@remixicon/react";


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
      <main className="flex w-full h-screen">
        <Sidebar >
          <SidebarItem icon={RiHome2Fill} text="Inicio" link='inicio' />
          <SidebarItem icon={RiGroupFill} text="Artistas/Grupos" alert link='artistas' />
          <SidebarItem icon={RiImageAddFill} text="Imágenes" alert link='imagenes' />
          {/* <SidebarItem icon={<FaCalendarDays size={20} />} text="Eventos" alert />
          <SidebarItem icon={<FaPenToSquare size={20} />} text="Noticias" alert /> */}
          <hr className="my-3" />
          <SidebarItem icon={RiSettings3Fill} text="Configuración" link='config'/>
        </Sidebar>
        <Outlet />
      </main>
    )
  }
};