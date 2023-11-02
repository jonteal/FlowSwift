import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import {
  GET_TICKET,
  GET_TICKETS,
} from "../../../../graphql/queries/ticketQueries";
import { UPDATE_TICKET } from "../../../../graphql/mutations/ticketMutations";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { Checkbox } from "../../../../components/reusable/Checkbox/Checkbox";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";

export const EditKanbanTicket = () => {
  const { ticketId, kanbanId } = useParams();

  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
  });

  const ticket = ticketData?.ticket;

  const [title, setTitle] = useState(ticket?.title);
  const [description, setDescription] = useState(ticket?.description);
  const [status, setStatus] = useState(ticket?.status);
  const [blocked, setBlocked] = useState(ticket?.blocked);
  const [blockedReason, setBlockedReason] = useState(ticket?.blockedReason);

  const [updateTicket] = useMutation(UPDATE_TICKET, {
    variables: {
      id: ticketId,
      title,
      description,
      blocked,
      kanbanId,
      status,
      blockedReason,
    },
    refetchQueries: [{ query: GET_TICKET, variables: { ticketId } }],

    update(cache, { data: { updateTicket } }) {
      const { tickets } = cache.readQuery({
        query: GET_TICKETS,
        variables: { kanbanId },
      });
      cache.writeQuery({
        query: GET_TICKETS,
        variables: { kanbanId },
        data: { tickets: [...tickets, updateTicket] },
      });
    },
  });

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong</p>;

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return alert("Please fill out all fields");
    }

    updateTicket(
      ticketId,
      title,
      description,
      kanbanId,
      status,
      blocked,
      blockedReason
    );
  };

  return (
    <div className="bg-slate-50 mt-2 mx-2 p-3 rounded-xl">
      <h1 className="text-lg text-left">Update Ticket</h1>
      <div className="">
        <form onSubmit={onSubmit}>
          <div>
            <DynamicInput
              id="edit-kanban-ticket-title"
              inputType="input"
              type="text"
              label="Title"
              changeHandler={(e) => setTitle(e.target.value)}
              placeholder="Name of the ticket"
              value={title}
              ariaLabel="Edit kanban ticket title"
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-notes"
              aria-label="Ticket description section"
              //   type="text"
              rows="3"
              placeholder="Description about this ticket"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-4">
              Status
            </label>
            <select
              id="status"
              className="form-select mb-4"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ready">Ready</option>
              <option value="inProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <div className="flex mb-4 flex-col items-start w-full">
              <Checkbox
                label="Is this story blocked?"
                value={blocked}
                setChangeHandler={() => setBlocked(!blocked)}
              />

              {blocked && (
                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
                    Description
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-notes"
                    aria-label="Blocked reason section"
                    //   type="text"
                    rows="3"
                    placeholder="Reason the story is blocked"
                    value={blockedReason}
                    onChange={(e) => setBlockedReason(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          <DynamicButton type="submit">Submit</DynamicButton>
        </form>
      </div>
    </div>
  );
};
