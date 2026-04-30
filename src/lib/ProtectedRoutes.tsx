import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const auth = useAuth();

  console.log(auth)


  return auth.accessToken && auth.user ? <Outlet /> : <Navigate to={"/sign-in"}/>;
};

export default ProtectedRoutes;
