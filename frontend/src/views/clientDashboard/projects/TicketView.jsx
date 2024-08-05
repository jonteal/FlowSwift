import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_TICKET } from "../../../graphql/queries/ticketQueries";
import { GET_KANBAN_STATUS_COLUMNS } from "../../../graphql/queries/kanbanStatusColumnQueries";

// COMPONENTS
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { DynamicContainer } from "../../../components/reusable/DynamicContainer/DynamicContainer";
import { Button } from "../../../@/components/ui/button";
// import { TicketViewContent } from "../../../components/kanban/";

// STATE
import { useSelector } from "react-redux";
import { useState } from "react";

export const TicketView = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const { userInfo } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(userInfo._id);

  const { ticketId, clientId, projectId, kanbanId } = useParams();
  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
  });

  const {
    loading: kanbanStatusColumnLoading,
    error: kanbanStatusColumnError,
    data: kanbanStatusColumnData,
  } = useQuery(GET_KANBAN_STATUS_COLUMNS, {
    variables: { kanbanId },
  });

  if (kanbanStatusColumnLoading) return <Spinner />;
  if (kanbanStatusColumnError) return <p>There was a problem...</p>;

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong</p>;

  return (
    <DynamicContainer className="mt-2">
      {!ticketLoading && !ticketError && (
        <div
          className={`h-screen ${
            darkMode ? "bg-sky-800" : "bg-slate-50"
          } mx-2 mt-2 rounded-xl`}
        >
          <div className="mx-auto w-100 p-5">
            <div className="flex flex-row justify-start">
              <Button>Back</Button>
              <Button asChild>
                <Link
                  className="ml-5"
                  to={`/clients/${clientId}/projects/${projectId}/kanbans/${kanbanId}/${ticketId}/edit`}
                >
                  Edit
                </Link>
              </Button>
            </div>

            {/* <TicketViewContent
              kanbanStatusColumnData={kanbanStatusColumnData}
              userInfo={userInfo}
              ticket={ticketData.ticket}
            /> */}
          </div>
        </div>
      )}
    </DynamicContainer>
  );
};
