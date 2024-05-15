import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// GRAPHQL
import { GET_CLIENTS_BY_STATUS } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { ClientsAccordion } from "../../../components/Accordions/ClientsAccordion";

// UTILS
import { clientContainers } from "../constants";

export const ClientsListByStatus = () => {
  const { status } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const clientContainer = clientContainers.find(
    (container) => container.state === status
  );

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS_BY_STATUS, { variables: { status } });

  if (clientLoading) return <Spinner />;
  if (clientError)
    return <p>There was a problem loading the client information...</p>;
  return (
    <>
      <h1 className="text-2xl mt-4 mb-2">{status}</h1>
      <h2 className="mb-4">
        Total {status} Records: {clientData.clientsByStatus.length}
      </h2>

      {clientContainer && (
        <ClientsAccordion
          // isExpanded={isExpanded}
          clientCount={clientData.clientsByStatus.length}
          clients={clientData.clientsByStatus}
          container={clientContainer}
          containerState={clientContainer?.state || ""}
        />
      )}
    </>
  );
};
