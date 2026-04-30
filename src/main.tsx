import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { ThemeProvider } from "./components/theme-provider.tsx";
import SignIn from "./pages/SignIn.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Home from "./pages/Home.tsx";
import Analytics from "./pages/Analytics.tsx";
import Settings from "./pages/Settings.tsx";
import App from "./App.tsx";
import ProtectedRoutes from "./lib/ProtectedRoutes.tsx";
import api from "./lib/api.ts";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/sign-in",
        Component: SignIn,
      },
      {
        path: "/sign-up",
        element: <h2>sign-up page</h2>,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/dashboard",
            Component: Dashboard,
             loader: async () => {
              return { urls: await getUrls() };
            },
          },

          {
            path: "/analytics",
            Component: Analytics,
          },
          {
            path: "/settings",
            Component: Settings,
            loader: async () => {
              return { profile: await getProfile() };
            },
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);


async function getProfile() {
  const res = await api.get("/auth/me");

  return res.data;
}



async function getUrls() {
  const res = await api.get("/urls");

  return res.data;
}
