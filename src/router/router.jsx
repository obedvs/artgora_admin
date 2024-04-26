import { Suspense, lazy } from "react";
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from "./protectedRoute";
import { PublicRoute } from "./publicRoute";
import { IndexRoute } from "./indexRoute";
import { Loading } from "../components/loading";

const Login = lazy(() => import("../pages/login/page.jsx"));
const Dashboard = lazy(() => import("../pages/dashboard/page.jsx"));

const DashboardExpositores = lazy(() => import("../pages/dashboard/expositores.jsx"));
const DashboardAgregarExpositores = lazy(() => import("../pages/dashboard/agregarExpositor.jsx"));
const DashboardEditarExpositores = lazy(() => import("../pages/dashboard/editarExpositor.jsx"));

const DashboardImagenes = lazy(() => import("../pages/dashboard/imagenes.jsx"));
const DashboardGaleria = lazy(() => import("../pages/dashboard/galeria.jsx"));
const DashboardAgregarImagen = lazy(() => import("../pages/dashboard/agregarImagen.jsx"));
const DashboardEditarImagen = lazy(() => import("../pages/dashboard/editarImagen.jsx"));

const DashboardConfiguration = lazy(() => import("../pages/dashboard/configuration.jsx"));



const AppRouter = () => {
    return (
    <>
    <Suspense fallback={<Loading />}>
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
                <Route path="config" element={<DashboardConfiguration />} />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Route>
            <Route path="/*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    </Suspense>
    </>
    )
};

export default AppRouter;