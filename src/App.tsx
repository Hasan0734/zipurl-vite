import {Outlet } from "react-router";
import { AuthProvider } from "./components/AuthProvider";
import { Toaster } from "./components/ui/sonner";



export default function App() {
  return (
    <AuthProvider >
          <Toaster position="top-center" />
      <Outlet /> 
    </AuthProvider>
  );
}