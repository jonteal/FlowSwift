import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import { ClientsContainer } from "../../../components/ClientsContainer/ClientsContainer";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";

import { FaUserAlt } from "react-icons/fa";

export const ClientList = () => {
  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS);

  if (clientLoading) return <Spinner />;
  if (clientError) return <p>Something went wrong...</p>;

  const clientContainers = [
    {
      id: "lead",
      state: "Lead",
    },
    {
      id: "prospect",
      state: "Prospect",
    },
    {
      id: "current",
      state: "Current",
    },
    {
      id: "former",
      state: "Former",
    },
    {
      id: "cold",
      state: "Cold",
    },
  ];

  return (
    <div>
      <div className="flex flex-row">
        <FaUserAlt className="mr-5" />
        <h5 className="mb-3">Total Records ({clientData?.clients.length})</h5>
      </div>
      <ul>
        {clientContainers.map((clientContainer) => (
          <ClientsContainer
            key={clientContainer.id}
            clientContainer={clientContainer}
            clientData={clientData}
          />
        ))}
      </ul>
    </div>
  );
};
