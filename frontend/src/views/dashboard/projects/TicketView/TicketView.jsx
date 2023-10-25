import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_TICKET } from "../../../../graphql/queries/ticketQueries";

// ICONS
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

// COMPONENTS
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";

export const TicketView = () => {
  const { ticketId, clientId, projectId } = useParams();
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

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong</p>;

  const { id, title, description, status, createdAt, user } = ticketData.ticket;

  return (
    <div className="h-screen border-slate-500 rounded-xl">
      {!ticketLoading && !ticketError && (
        <div className="h-screen bg-slate-50 mx-2 mt-2 rounded-xl">
          <div className="mx-auto w-100 p-5">
            <div className="flex flex-row justify-start">
              <DynamicButton type="back" color="lightBlue">
                Back
              </DynamicButton>
              <DynamicButton
                className="ml-5"
                type="link"
                color="lightBlue"
                link={`/clients/${clientId}/projects/${projectId}/kanban/${id}/edit`}
              >
                Edit
              </DynamicButton>
            </div>

            <div className="mt-5 flex flex-col items-start border rounded-xl py-3 bg-sky-300">
              <div className="px-3 py-0 m-2">
                <p className="text-slate-600 font-bold text-left text-sm mb-1">
                  Title
                </p>
                <p className="text-slate-800 font-normal text-left text-lg border px-3 py-1 rounded-md bg-slate-50">
                  {title}
                </p>
              </div>
              <div className="px-3 py-0 m-2 w-full">
                <p className="text-slate-600 font-bold text-left text-sm mb-1">
                  Description
                </p>

                <p className="border w-full h-auto text-left pl-2 px-3 py-1 rounded-md bg-slate-50">
                  {description}
                </p>
              </div>
              <div className="px-3 py-0 m-2">
                <p className="text-slate-600 font-bold text-left text-sm mb-1">
                  Status
                </p>
                <p className="text-slate-800 font-normal text-left text-base border px-3 py-1 rounded-md bg-slate-50">
                  {status}
                </p>
              </div>
              <div className="px-3 py-0 m-2">
                <p className="text-slate-600 font-bold text-left text-sm mb-1">
                  Owned by:
                </p>
                <p className="text-slate-800 font-normal text-left text-base border px-3 py-1 rounded-md bg-slate-50">
                  {user.name}
                </p>
              </div>

              <div className="px-3 py-0 m-2">
                <p className="text-slate-600 font-bold text-left text-sm mb-1">
                  Created:
                </p>
                <p className="text-slate-800 font-normal text-left text-base border px-3 py-1 rounded-md bg-slate-50">
                  {createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
