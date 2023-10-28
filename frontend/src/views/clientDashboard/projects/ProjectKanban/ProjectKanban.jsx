import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";

// COMPONENTS
import { StatusColumn } from "../../../../components/kanban/StatusColumn/StatusColumn";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { useDispatch, useSelector } from "react-redux";
import { setSizeOff, setSizeOn } from "../../../../slices/ticketSlice";

export const ProjectKanban = () => {
  const { projectId } = useParams();

  const dispatch = useDispatch();
  const size = useSelector((state) => state.ticket.size);

  console.log("size", size);

  const setTicketSizeOff = () => {
    dispatch(setSizeOff());
  };

  const setTicketSizeOn = () => {
    dispatch(setSizeOn());
  };

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
      state: "ready",
    },
    {
      id: "In Progress",
      state: "inProgress",
    },
    {
      id: "Done",
      state: "done",
    },
  ];

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong...</p>;

  return (
    <>
      <DynamicButton color="red" className="my-3" link="addTicket" type="link">
        Add Ticket
      </DynamicButton>
      <button className="border mr-3 p-2 bg-sky-400" onClick={setTicketSizeOn}>
        Size On
      </button>
      <button className="border ml-3 p-2 bg-sky-400" onClick={setTicketSizeOff}>
        Size Off
      </button>
      <StatusColumn statusColumns={statusColumns} ticketData={ticketData} />
    </>
  );
};
