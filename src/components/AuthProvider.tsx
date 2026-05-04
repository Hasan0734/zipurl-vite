import { useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../lib/context";
import type { User } from "@/lib/types";
import api from "@/lib/api";
import { Spinner } from "./ui/spinner";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const rehydrate = async () => {
      try {
        const res = await api.post("/auth/refresh");
        const data = res.data;
        setAccessToken(data.access_token);
        setUser(data.user);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    rehydrate();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      const isRetry = (config as any)._retry;
      config.headers.Authorization =
        !isRetry && accessToken
          ? `Bearer ${accessToken}`
          : config.headers.Authorization;

      return config;
    });
    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalReq = error.config;

        if (
          error.response.status === 401 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const res = await api.post("/auth/refresh");
            const { access_token, user } = res.data;

            setAccessToken(access_token);
            if (user) setUser(user);

            originalReq.headers.Authorization = `Bearer ${access_token}`;
            originalReq._retry = true;
            return api(originalReq);
          } catch {
            setAccessToken(null);
            setUser(null);
          }
        }

        return Promise.reject(error);
      },
    );
    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  });

  const logout = async () => {
    setUser(null);
    setAccessToken(null);

    await api.post("/auth/sign-out");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex gap-2 items-center">
          <Spinner /> Loading...
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, accessToken, setAccessToken, setUser, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
