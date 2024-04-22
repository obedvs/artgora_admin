import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Loading } from "../components/loading";


export const PublicRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('userId');
  const [ isloading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== null) {
      navigate("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  if (isloading) {return <Loading />}
  else {
    return (
        <Outlet />
    )
  }
};