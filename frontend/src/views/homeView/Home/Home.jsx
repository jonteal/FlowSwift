import { useQuery } from "@apollo/client";

// GRAPHQL
import {
  GET_ORGANIZATION,
  GET_ORGANIZATIONS,
} from "../../../graphql/queries/organizationQueries";
import { GET_USER } from "../../../graphql/queries/userQueries";

// COMPONENTS
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";

// STATE
import { useSelector } from "react-redux";
import { OrganizationCard } from "../../../components/OrganizationCard/OrganizationCard";

export const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);

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

  // let organizationName = "";

  // const { organizationName } = organizationsData.organizations[0];

  return (
    <div className={`${darkMode ? "bg-sky-950" : "bg-slate-50"} h-screen`}>
      <h1 className="font-semibold text-3xl pt-5">Welcome back, {name}!</h1>

      {isOwner && (
        <DynamicButton
          className="my-3"
          type="link"
          color="red"
          link="/addOrganization"
        >
          Add Organization
        </DynamicButton>
      )}
      <div className="flex md:flex-row flex-wrap justify-center items-center flex-col border mx-20 py-5">
        {organizationsData.organizations.map((org) => (
          <OrganizationCard key={org.id} organization={org} />
        ))}
      </div>

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
    </div>
  );
};
