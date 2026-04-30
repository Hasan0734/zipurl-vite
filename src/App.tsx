import {Outlet } from "react-router";
import { AuthProvider } from "./components/AuthProvider";



export default function App() {
  return (
    <AuthProvider >
      <Outlet /> 
    </AuthProvider>
  );
}