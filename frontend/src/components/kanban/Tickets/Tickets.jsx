import { Spinner } from "../Spinner/Spinner";
import { Ticket } from "../Ticket/Ticket";

import { useQuery } from "@apollo/client";
import { GET_TICKETS } from "../../graphql/queries/ticketQueries";

export const Tickets = () => {
  const { loading, error, data } = useQuery(GET_TICKETS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div>
      {data.tickets.length > 0 ? (
        <div>
          {data.tickets.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <p>No tickets right now</p>
      )}
    </div>
  );
};
