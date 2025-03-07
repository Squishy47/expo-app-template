import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./globals.css";

import { Theme, ThemeProvider } from "./components/ui/ThemeProvider.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

function Main() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme={Theme.System} storageKey="vite-ui-theme">
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
