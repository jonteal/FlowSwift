import { useSelector } from "react-redux";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries/userQueries";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { useParams } from "react-router-dom";

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

  if (userLoading) return <Spinner />;
  if (userError) return <p>There was an error...</p>;

  const isAdmin = userData.user.role === "admin";
  const isOwner = userData.user.role === "owner";
  return (
    <div>
      OrganizationProfile
      {isAdmin ||
        (isOwner && (
          <div className="text-base mt-10 border py-4 w-1/2 mx-auto">
            <p className="mb-3">Add employees to your organization</p>
            <DynamicButton
              link={`/organizations/${organizationId}/addUser`}
              type="link"
              color="lightBlue"
            >
              Add Employees
            </DynamicButton>
          </div>
        ))}
    </div>
  );
};
