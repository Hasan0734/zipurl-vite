import {Outlet } from "react-router";
import { AuthProvider } from "./components/AuthProvider";
import { Toaster } from "react-hot-toast";



export default function App() {
  return (
    <AuthProvider >
        <Toaster/>
      <Outlet /> 
    </AuthProvider>
  );
}