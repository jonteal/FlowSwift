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
// import { useSelector } from "react-redux";
import { OrganizationCard } from "../../../components/OrganizationCard/OrganizationCard";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { OrganizationType } from "../../../types/types";

export const Home = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

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

  if (organizationsLoading || userLoading) return <Spinner />;
  if (organizationsError || userError) return <p>There was an error...</p>;

  const isOwner = userData.user.role === "owner";

  const { name } = userInfo;

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
        {organizationsData.organizations.map((org: OrganizationType) => (
          <OrganizationCard key={org.id} organization={org} />
        ))}
      </div>
    </div>
  );
};
