import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

// GRAPHQL
import {
  GET_ORGANIZATION,
  GET_ORGANIZATIONS,
} from "../../../graphql/queries/organizationQueries";
import { GET_USER } from "../../../graphql/queries/userQueries";

// COMPONENTS
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";

export const Home = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { userInfo } = useSelector((state) => state.auth);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: userInfo._id },
  });

  const {
    loading: organizationsLoading,
    error: organizationsError,
    data: organizationsData,
  } = useQuery(GET_ORGANIZATIONS, {
    variables: { userId: userInfo._id },
  });

  const {
    loading: organizationLoading,
    error: organizationError,
    data: organizationData,
  } = useQuery(GET_ORGANIZATION, {
    variables: { id: userData?.user.organizationId },
  });

  if (organizationsLoading || userLoading || organizationLoading)
    return <Spinner />;
  if (organizationsError || userError || organizationError)
    return <p>There was an error...</p>;

  const isAdmin = userData.user.role === "admin";
  const isOwner = userData.user.role === "owner";

  const { name } = userInfo;

  return (
    <div className={`${darkMode ? "bg-sky-800" : "bg-slate-50"} h-screen`}>
      <h1 className="font-semibold text-3xl pt-5">Welcome back, {name}!</h1>

      {isOwner && (
        <DynamicButton
          className="mt-3"
          type="link"
          color="red"
          link="/addOrganization"
        >
          Add Organization
        </DynamicButton>
      )}

      {/* {organizationName && ( */}
      {/* <h2 className="font-semibold text-1xl mt-3">
        Company: {organizationName || ""}
      </h2> */}
      {/* )} */}

      {isAdmin ||
        (isOwner && (
          <div className="text-base mt-10 border py-4 w-1/2 mx-auto">
            <p className="mb-3">Add employees to your organization</p>
            <DynamicButton link="/addUser" type="link" color="lightBlue">
              Add Employees
            </DynamicButton>
          </div>
        ))}
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
