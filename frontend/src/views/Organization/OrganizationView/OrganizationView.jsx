import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { OrganizationViewNav } from "../../../components/nav/OrganizationViewNav/OrganizationViewNav";
import { Outlet } from "react-router-dom";

export const OrganizationView = () => {
  return (
    <div>
      <div className="mt-4 flex flex-col justify-center">
        {/* <DynamicButton
          color="lightBlue"
          type="link"
          link="clients"
          className="mx-2"
        >
          Clients
        </DynamicButton>
        <DynamicButton
          color="lightBlue"
          type="link"
          link="projects"
          className="mx-2"
        >
          Projects
        </DynamicButton>
        <DynamicButton
          color="lightBlue"
          type="link"
          link="kanbans"
          className="mx-2"
        >
          Kanbans
        </DynamicButton> */}
        <OrganizationViewNav />
        <Outlet />
      </div>
    </div>
  );
};
