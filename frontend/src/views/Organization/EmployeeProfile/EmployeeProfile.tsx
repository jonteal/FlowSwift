import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries/userQueries";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { useParams } from "react-router-dom";

export const EmployeeProfile = () => {
  const { userId } = useParams();
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: userId },
  });
  if (userLoading) return <Spinner />;
  if (userError) return <p>There was an error...</p>;

  const { name } = userData.user;
  return <div>{name}</div>;
};
