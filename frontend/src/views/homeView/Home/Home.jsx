import { useSelector } from "react-redux";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { useContext } from "react";
import { ThemeContext } from "../../../context";
import { GET_ORGANIZATIONS } from "../../../graphql/queries/organizationQueries";
import { useQuery } from "@apollo/client";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";

export const Home = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { userInfo } = useSelector((state) => state.auth);

  const {
    loading: organizationsLoading,
    error: organizationsError,
    data: organizationsData,
  } = useQuery(GET_ORGANIZATIONS, {
    variables: { userId: userInfo._id },
  });

  if (organizationsLoading) return <Spinner />;
  if (organizationsError) return <p>There was an error...</p>;

  console.log("organizationsData: ", organizationsData);

  const isAdmin = userInfo.role === "admin";

  console.log("userInfo: ", userInfo);

  const { name } = userInfo;
  const { organizationName } = organizationsData.organizations[0];

  return (
    <div className={`${darkMode ? "bg-sky-800" : "bg-slate-50"} h-screen`}>
      <h1 className="font-semibold text-3xl pt-5">Welcome back, {name}!</h1>

      {organizationName === "" && (
        <>
          <p className="mb-3">Add Company</p>
          <DynamicButton type="link" color="red" link="/addOrganization">
            Add Organization
          </DynamicButton>
        </>
      )}

      {organizationName && (
        <h2 className="font-semibold text-1xl mt-3">
          Company: {organizationName || ""}
        </h2>
      )}

      {isAdmin && (
        <div className="text-base mt-10 border py-4 w-1/2 mx-auto">
          <p className="mb-3">Add employees to your organization</p>
          <DynamicButton link="/addUser" type="link" color="lightBlue">
            Add Employees
          </DynamicButton>
        </div>
      )}

      {/* <div className="mt-4 flex flex-row justify-center">
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
      </div> */}
    </div>
  );
};
