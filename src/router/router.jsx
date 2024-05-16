import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from "./protectedRoute";
import { PublicRoute } from "./publicRoute";
import { IndexRoute } from "./indexRoute";

// Pages
import Login from "../pages/login/page.jsx";

import Dashboard from "../pages/dashboard/page.jsx";
import DashboardExpositores from "../pages/dashboard/expositores.jsx";
import DashboardAgregarExpositores from "../pages/dashboard/agregarExpositor.jsx";
import DashboardEditarExpositores from "../pages/dashboard/editarExpositor.jsx";

import DashboardImagenes from "../pages/dashboard/imagenes.jsx";
import DashboardGaleria from "../pages/dashboard/galeria.jsx";
import DashboardAgregarImagen from "../pages/dashboard/agregarImagen.jsx";
import DashboardEditarImagen from "../pages/dashboard/editarImagen.jsx";

import DashboardEventos from "../pages/dashboard/eventos.jsx";
import DashboardAgregarEvento from "../pages/dashboard/agregarEvento.jsx";
import DashboardEditarEvento from "../pages/dashboard/editarEvento.jsx";

import DashboardConfiguration from "../pages/dashboard/configuration.jsx";




const AppRouter = () => {
    return (
    <>
    <Routes>
        <Route path="/" element={<IndexRoute />} >

        </Route>
        <Route path="/login" element={<PublicRoute />} >
            <Route index element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute />} >
            <Route path="" element={<Dashboard />} />
            <Route path="inicio" element={<Dashboard />} />

            <Route path="expositores" element={<DashboardExpositores />} />
            <Route path="expositores/agregar" element={<DashboardAgregarExpositores />} />
            <Route path="expositores/editar/:expositorId" element={<DashboardEditarExpositores />} />

            <Route path="imagenes" element={<DashboardImagenes />} />
            <Route path="imagenes/galeria/:expositorId/:expositorName" element={<DashboardGaleria />} />
            <Route path="imagenes/agregar/:expositorId/:expositorName" element={<DashboardAgregarImagen />} />
            <Route path="imagenes/editar/:imagenId" element={<DashboardEditarImagen />} />

            <Route path="eventos" element={<DashboardEventos />} />
            <Route path="eventos/agregar" element={<DashboardAgregarEvento />} />
            <Route path="eventos/editar/:eventoId" element={<DashboardEditarEvento />} />

            <Route path="config" element={<DashboardConfiguration />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
        <Route path="/*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
    </>
    )
};

export default AppRouter;