import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_USER } from "../../graphql/queries/userQueries";
import { GET_ORGANIZATION } from "../../graphql/queries/organizationQueries";

// COMPONENTS
import { Button } from "../../@/components/ui/button";
import { Spinner } from "../../components/reusable/Spinner/Spinner";

// STATE
import { useSelector } from "react-redux";

export const OrganizationProfile = () => {
  const { organizationId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: userInfo._id },
  });

  const {
    loading: organizationLoading,
    error: organizationError,
    data: organizationData,
  } = useQuery(GET_ORGANIZATION, {
    variables: { id: organizationId },
  });

  if (userLoading || organizationLoading) return <Spinner />;
  if (userError || organizationError) return <p>There was an error...</p>;

  const { organizationName } = organizationData.organization;

  const isAdmin = userData.user.role === "admin";
  const isOwner = userData.user.role === "owner";

  return (
    <div>
      <h1 className="mt-3 font-semibold text-xl">{organizationName}</h1>
      {isAdmin ||
        (isOwner && (
          <div className="text-base mt-10 border flex flex-col items-center pt-2 pb-4 w-1/2 mx-auto">
            <h2 className="font-semibold text-lg mb-4">Employee Dashboard</h2>
            <div className="flex flex-row">
              <Button asChild>
                <Link
                  to={`/organizations/${organizationId}/addUser`}
                  className="mr-1"
                >
                  Add Employees
                </Link>
              </Button>

              <Button asChild>
                <Link
                  to={`/organizations/${organizationId}/addUser`}
                  className="text-slate-500 border"
                >
                  Add Employees
                </Link>
              </Button>

              <Button asChild>
                <Link
                  link={`/organizations/${organizationId}/employees`}
                  type="link"
                  color="lightBlue"
                  className="ml-1"
                >
                  Current Employees
                </Link>
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};
