import { Link, useParams } from "react-router-dom";
import { GET_USERS } from "../../../graphql/queries/userQueries";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { useQuery } from "@apollo/client";

export const OrganizationEmployees = () => {
  const { organizationId } = useParams();

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USERS, {
    variables: { organizationId },
  });

  if (userLoading) return <Spinner />;
  if (userError) return <p>There was an error...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mt-3">Employees</h1>
      {userData.users.map((user) => (
        <Link
          key={user._id}
          to={`/organizations/${organizationId}/${user._id}/profile`}
        >
          {user.name}
        </Link>
      ))}
    </div>
  );
};
