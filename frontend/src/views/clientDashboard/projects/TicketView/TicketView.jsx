import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_TICKET } from "../../../../graphql/queries/ticketQueries";
import { GET_KANBAN_STATUS_COLUMNS } from "../../../../graphql/queries/kanbanStatusColumnQueries";

// COMPONENTS
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { NameValuePair } from "../../../../components/reusable/NameValuePair/NameValuePair";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";

// STATE
import { useSelector } from "react-redux";

export const TicketView = () => {
  const { darkMode } = useSelector((state) => state.theme);

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

  const {
    id,
    title,
    description,
    status,
    createdAt,
    user,
    blocked,
    blockedReason,
    ready,
    typeOfTicket,
  } = ticketData.ticket;

  const ticketStatus = kanbanStatusColumnData.kanbanStatusColumns.find(
    (column) => column.id === status
  );

  return (
    <DynamicContainer className="mt-2">
      {!ticketLoading && !ticketError && (
        <div
          className={`h-screen ${
            darkMode ? "bg-sky-800" : "bg-slate-50"
          }  mx-2 mt-2 rounded-xl`}
        >
          <div className="mx-auto w-100 p-5">
            <div className="flex flex-row justify-start">
              <DynamicButton type="back" color="lightBlue">
                Back
              </DynamicButton>
              <DynamicButton
                className="ml-5"
                type="link"
                color="lightBlue"
                link={`/clients/${clientId}/projects/${projectId}/kanbans/${kanbanId}/${id}/edit`}
              >
                Edit
              </DynamicButton>
            </div>

            <div className="flex flex-col items-start justify-start mt-3">
              <h3>Status</h3>
              <div className="flex flex-row mt-2">
                <DynamicButton type="primary" className="mr-2">
                  Ready
                </DynamicButton>
                <DynamicButton type="primary">Blocked</DynamicButton>
              </div>
            </div>

            <div className="flex flex-row justify-start mt-4">
              <h3>Description</h3>
            </div>

            <div
              className={`${
                darkMode ? "bg-sky-950" : ""
              } mt-2 flex flex-col items-start border rounded-xl py-3 pl-3`}
            >
              <NameValuePair name="Title" value={title} />

              <NameValuePair name="Description" value={description} />

              <NameValuePair name="Status" value={ticketStatus.columnState} />

              <NameValuePair name="Owned by: " value={user.name} />

              {/* <NameValuePair name="Created: " value={createdAt} /> */}
            </div>
          </div>
        </div>
      )}
    </DynamicContainer>
  );
};
