import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../graphql/queries/clientQueries";
import { useSelector } from "react-redux";

export const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const userId = userInfo._id;

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS, { variables: { userId } });

  if (clientLoading) return <p>Loading...</p>;
  if (clientError)
    return <p>There was a problem loading the client information...</p>;

  console.log("clientData", clientData);

  return (
    <div>
      {clientData.clients.map((client) => (
        <div className="border my-2 bg-teal-500" key={client.id}>
          <p className="bg-teal-500">{client.companyName}</p>
          <p>{client.firstName}</p>
          <p>{client.lastName}</p>
        </div>
      ))}
    </div>
  );
};
