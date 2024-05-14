import { useSelector } from "react-redux";
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/userQueries";
import { GET_ORGANIZATION } from "../../graphql/queries/organizationQueries";
import { DynamicButton } from "../../components/reusable/DynamicButton/DynamicButton";
import { useParams } from "react-router-dom";
import { Button } from "../../@/components/ui/button";

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
              <DynamicButton
                link={`/organizations/${organizationId}/addUser`}
                type="link"
                color="lightBlue"
                className="mr-1"
              >
                Add Employees
              </DynamicButton>
              <Button
                href={`/organizations/${organizationId}/addUser`}
                className="text-slate-500 border"
                variant="default"
              >
                Add Employees
              </Button>
              <DynamicButton
                link={`/organizations/${organizationId}/employees`}
                type="link"
                color="lightBlue"
                className="ml-1"
              >
                Current Employees
              </DynamicButton>
            </div>
          </div>
        ))}
    </div>
  );
};
