import { useEffect, useState } from "react";
import { AuthContext } from "../lib/context";
import type { User } from "@/lib/types";
import AxiosInterceptor from "./AxiosInterceptor";
import api from "@/lib/api";
import { Spinner } from "./ui/spinner";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   let isMounted = true;
  //   const rehydrate = async () => {
  //     try {
  //       const res = await api.post("/auth/refresh");
  //       const data = res.data;
  //       console.log(data);
  //       if (isMounted) {
  //         setAccessToken(data.access_token);
  //         setUser(data.user);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       if (isMounted) {
  //         setUser(null);
  //         setAccessToken(null);
  //       }
  //     } finally {
  //       if (isMounted) setIsLoading(false);
  //     }
  //   };

  //   rehydrate();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalReq = error.config;

        if (error.response.status === 401 && !originalReq._retry) {
          originalReq._retry = true;
          try {
            const res = await api.post("/auth/refresh");
            const data = res.data;
            setAccessToken(data.access_token);
            setUser(data.user);

            originalReq.headers["Authorization"] =
              `Bearer ${data.access_token}`;
          } catch (error) {
            logout();
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [accessToken]);

  const logout = async () => {
    setUser(null);
    setAccessToken(null);

    await api.post("/auth/sign-out");
  };

  // if (isLoading) {
  //   return null;
  // }

  return (
    <AuthContext.Provider
      value={{ user, accessToken, setAccessToken, setUser, logout, isLoading }}
    >
      <AxiosInterceptor>{children}</AxiosInterceptor>
    </AuthContext.Provider>
  );
};
