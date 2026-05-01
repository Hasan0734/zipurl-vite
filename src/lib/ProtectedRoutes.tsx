import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoutes = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth.accessToken && auth.user ? (
    <Outlet />
  ) : (
    <Navigate to={"/sign-in"} state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
