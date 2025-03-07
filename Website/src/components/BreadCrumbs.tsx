import { Separator } from "@radix-ui/react-dropdown-menu";

import { Link, Outlet } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";

type BreadCrumb = {
  label: string;
  to: string;
};

export function BreadCrumbs({ crumbs }: { crumbs: BreadCrumb[] }) {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((crumb, index) => {
                return (
                  <div className="flex items-center gap-2" key={crumb.to}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={crumb.to}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < crumbs.length - 1 && (
                      <BreadcrumbSeparator
                        key={index}
                        className="hidden md:block"
                      />
                    )}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <Outlet />
    </SidebarInset>
  );
}
