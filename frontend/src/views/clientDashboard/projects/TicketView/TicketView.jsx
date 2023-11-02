import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";

// GRAPHQL
import { GET_TICKET } from "../../../../graphql/queries/ticketQueries";

// COMPONENTS
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";

// STATE
import { ThemeContext } from "../../../../context";
import { useContext } from "react";
import { GET_KANBAN_STATUS_COLUMNS } from "../../../../graphql/queries/kanbanStatusColumnQueries";

export const TicketView = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { ticketId, clientId, projectId, kanbanId } = useParams();
  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
  });

  const navigate = useNavigate();

  const handleBackNavigate = () => {
    navigate(-1);
  };

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

  const { id, title, description, status, createdAt, user } = ticketData.ticket;
  console.log(
    "kanbanStatusColumnData.kanbanStatusColumns: ",
    kanbanStatusColumnData.kanbanStatusColumns
  );
  console.log("status: ", status);
  const ticketStatus = kanbanStatusColumnData.kanbanStatusColumns.find(
    (column) => column.id === status
  );

  return (
    <div className="h-screen border-slate-500 rounded-xl">
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

            <div
              className={`${
                darkMode ? "bg-sky-950" : ""
              } mt-5 flex flex-col items-start border rounded-xl py-3`}
            >
              <div className="px-3 py-0 m-2">
                <p
                  className={`${
                    darkMode ? "text-slate-50" : "text-slate-600"
                  }  font-bold text-left text-sm mb-1`}
                >
                  Title
                </p>
                <p className="text-slate-800 font-normal text-left text-lg border px-3 py-1 rounded-md bg-slate-50">
                  {title}
                </p>
              </div>
              <div className="px-3 py-0 m-2 w-full">
                <p
                  className={`${
                    darkMode ? "text-slate-50" : "text-slate-600"
                  }  font-bold text-left text-sm mb-1`}
                >
                  Description
                </p>

                <p className="border w-full h-auto text-left pl-2 px-3 py-1 rounded-md bg-slate-50">
                  {description}
                </p>
              </div>
              <div className="px-3 py-0 m-2">
                <p
                  className={`${
                    darkMode ? "text-slate-50" : "text-slate-600"
                  }  font-bold text-left text-sm mb-1`}
                >
                  Status
                </p>
                <p className="text-slate-800 font-normal text-left text-base border px-3 py-1 rounded-md bg-slate-50">
                  {ticketStatus.columnState}
                </p>
              </div>
              <div className="px-3 py-0 m-2">
                <p
                  className={`${
                    darkMode ? "text-slate-50" : "text-slate-600"
                  }  font-bold text-left text-sm mb-1`}
                >
                  Owned by:
                </p>
                <p className="text-slate-800 font-normal text-left text-base border px-3 py-1 rounded-md bg-slate-50">
                  {user.name}
                </p>
              </div>

              <div className="px-3 py-0 m-2">
                <p
                  className={`${
                    darkMode ? "text-slate-50" : "text-slate-600"
                  }  font-bold text-left text-sm mb-1`}
                >
                  Created:
                </p>
                <p className="text-slate-800 font-normal text-left text-base border px-3 py-1 rounded-md bg-slate-50">
                  {format(createdAt, "MM/dd/yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
