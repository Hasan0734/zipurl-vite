import { useAuth } from "@/hooks/use-auth";
import api from "@/lib/api";
import { useEffect, type ReactNode } from "react";

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  useEffect(() => {
    const req = api.interceptors.request.use((config) => {
      if (auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }

      return config;
    });

    return () => api.interceptors.request.eject(req);
  });
  return children;
};

export default AxiosInterceptor;
