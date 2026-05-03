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
import SignUp from "./pages/SignUp.tsx";
import URLs from "./pages/Urls.tsx";

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
        Component: SignUp,
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
            path: "/urls",
            Component: URLs,
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
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error) {}
}

async function getUrls() {
  try {
    const res = await api.get("/urls");
    return res.data;
  } catch (error) {}
}
