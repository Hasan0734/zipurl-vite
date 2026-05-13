import { Outlet } from "react-router";
import { AuthProvider } from "./components/AuthProvider";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <Toaster position="top-center" />
          <Outlet />
        
      </AuthProvider>
    </QueryClientProvider>
  );
}
