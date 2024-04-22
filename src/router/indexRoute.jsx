import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const IndexRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('userId');

  useEffect(() => {
    if (isAuthenticated === null) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return null
};