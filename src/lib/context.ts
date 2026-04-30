import { createContext } from "react";
import type { User } from "@/lib/types";


interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
