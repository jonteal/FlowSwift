import { useSelector } from "react-redux";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const Home = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { userInfo } = useSelector((state) => state.auth);

  const isAdmin = userInfo.role === "admin";

  console.log("userInfo: ", userInfo);

  const { name, organization } = userInfo;

  return (
    <div className={`${darkMode ? "bg-sky-800" : "bg-slate-50"} h-screen`}>
      <h1 className="font-semibold text-3xl pt-5">Welcome back, {name}!</h1>

      {/*  Fix this to only show if there is no organization */}
      {!organization && <p className="mb-3">Add Company</p>}
      <DynamicButton type="link" color="red" link="/addOrganization">
        Add Organization
      </DynamicButton>

      {/*  Fix this to only show if an organization is present */}
      {organization && (
        <h2 className="font-semibold text-1xl mt-3">Company: {organization}</h2>
      )}

      {isAdmin && (
        <div className="text-base mt-10">
          <p className="mb-3">Add employees to your organization</p>
          <DynamicButton link="/addUser" type="link" color="lightBlue">
            Add Employees
          </DynamicButton>
        </div>
      )}

      <div className="mt-4 flex flex-row justify-center">
        <DynamicButton
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
      </div>
    </div>
  );
};
