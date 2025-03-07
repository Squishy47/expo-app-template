import { Outlet } from "react-router-dom";

import { LandingPage } from "@/pages/Landing";

export default function Main() {
  return (
    <div className="mx-auto w-full">
      <LandingPage />
      <Outlet />
    </div>
  );
}
