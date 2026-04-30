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

  useEffect(() => {
    let isMounted = true;
    const rehydrate = async () => {
      try {
        const res = await api.post("/auth/refresh");
        const data = res.data;
        console.log(data)
        if (isMounted) {
          setAccessToken(data.access_token);
          setUser(data.user);
        }
      } catch (error) {
        console.log(error)
        if (isMounted) {
          setUser(null);
          setAccessToken(null);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    rehydrate();
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const rehydrate = async () => {
  //     try {
  //       const res = await api.post("/auth/refresh", {
  //         signal: controller.signal,
  //       });
  //       const data = res.data;
  //       setAccessToken(data.access_token);
  //       setUser(data.user);
  //     } catch (err: unknown) {
  //       const error = err as { name?: string };
  //       if (error.name !== "CanceledError") {
  //         console.error(error);
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   rehydrate();
  //   return () => controller.abort();
  // }, []);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };


  if(isLoading) {
   return  null;
  }


  return (
    <AuthContext.Provider
      value={{ user, accessToken, setAccessToken, setUser, logout, isLoading }}
    >
      <AxiosInterceptor>{children}</AxiosInterceptor>
    </AuthContext.Provider>
  );
};
