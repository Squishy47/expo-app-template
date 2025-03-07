import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./globals.css";

import { Theme, ThemeProvider } from "./components/shadcn/themeProvider.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";

function Main() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme={Theme.System} storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
}
// test change change me againasdfasdf

createRoot(document.getElementById("root")!).render(<Main />);
