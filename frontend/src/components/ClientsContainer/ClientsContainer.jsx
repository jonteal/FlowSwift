import { useState } from "react";

// COMPONENTS
import { ClientTable } from "../ClientTable/ClientTable";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";
import { ClientsAccordion } from "../Accordions/ClientsAccordion/ClientsAccordion";

export const ClientsContainer = ({ clientData, clientContainer }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
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
