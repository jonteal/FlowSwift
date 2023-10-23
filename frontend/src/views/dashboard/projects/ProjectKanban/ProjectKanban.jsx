import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";

// COMPONENTS
import { StatusColumn } from "../../../../components/kanban/StatusColumn/StatusColumn";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";

export const ProjectKanban = () => {
  const { projectId } = useParams();
  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKETS, {
    variables: { projectId },
  });

  const statusColumns = [
    {
      id: "Ready",
      state: "Ready",
    },
    {
      id: "In Progress",
      state: "In Progress",
    },
    {
      id: "Done",
      state: "Done",
    },
  ];

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong...</p>;

  return (
    <>
      <DynamicButton color="red" className="my-3" link="addTicket" type="link">
        Add Ticket
      </DynamicButton>
      <StatusColumn statusColumns={statusColumns} ticketData={ticketData} />
    </>
  );
};
