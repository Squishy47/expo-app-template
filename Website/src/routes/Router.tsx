import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errorPage";
import Root from "./root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);
