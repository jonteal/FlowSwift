// COMPONENTS
import { ClientTable } from "../ClientTable/ClientTable";
import { ClientsAccordion } from "../Accordions/ClientsAccordion/ClientsAccordion";

// STATE
import { useState } from "react";
import { useSelector } from "react-redux";

export const ClientsContainer = ({ clientData, clientContainer }) => {
  const { darkMode } = useSelector((state) => state.theme);
  const [isExpanded, setIsExpanded] = useState(false);

  const clientCount = clientData.clients.filter(
    (client) => client.status === clientContainer.state
  ).length;

  return (
    <div
      key={clientContainer.id}
      className="mb-7 border-slate-400 p-2 rounded-md overflow-x-scroll	"
    >
      <ClientsAccordion
        isExpanded={isExpanded}
        clientCount={clientCount}
        clients={clientData.clients}
        container={clientContainer}
        containerState={clientContainer.state}
        linkLabel="View All"
        link={`list/${clientContainer.state}`}
      />

      {isExpanded && (
        <ClientTable
          key={clientContainer.id}
          clientContainer={clientContainer}
          clients={clientData.clients}
        />
      )}
    </div>
  );
};
