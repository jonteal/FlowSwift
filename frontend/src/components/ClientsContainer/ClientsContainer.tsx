// COMPONENTS
import { ClientsAccordion } from "../Accordions/ClientsAccordion";

// STATE
import { ClientContainerType, ClientType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

export type ClientsContainerProps = {
  clientData: {
    clients: ClientType[];
  };
  clientContainer: ClientContainerType;
};

export const ClientsContainer = ({
  clientData,
  clientContainer,
}: ClientsContainerProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const clientCount = clientData.clients.filter(
    (client) => client.status === clientContainer.state
  ).length;

  return (
    <div
      key={clientContainer.id}
      className="mb-7 border-slate-400 p-2 rounded-md overflow-x-scroll	"
    >
      <ClientsAccordion
        clientCount={clientCount}
        clients={clientData.clients}
        container={clientContainer}
        containerState={clientContainer.state}
        linkLabel="View All"
        link={`list/${clientContainer.state}`}
      />
    </div>
  );
};
