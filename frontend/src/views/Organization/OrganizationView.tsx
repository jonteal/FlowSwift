import { Outlet } from "react-router-dom";
import { OrganizationViewNav } from "../../components/nav/OrganizationViewNav";

export const OrganizationView = () => (
  <div className="mt-0 flex flex-col justify-center">
    <OrganizationViewNav />
    <Outlet />
  </div>
);
