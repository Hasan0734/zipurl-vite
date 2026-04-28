import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

import {createBrowserRouter, RouterProvider} from 'react-router'



  const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>
    },
    {
      path: '/sign-in',
      element: <h2>sign-in page</h2>
    },
        {
      path: '/sign-up',
      element: <h2>sign-up page</h2>
    }
  ])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
      {/* <App/> */}
    </ThemeProvider>
  </StrictMode>,
);
