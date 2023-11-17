import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import {
  GET_TICKET,
  GET_TICKETS,
} from "../../../../graphql/queries/ticketQueries";
import { UPDATE_TICKET } from "../../../../graphql/mutations/ticketMutations";
import { GET_KANBAN_STATUS_COLUMNS } from "../../../../graphql/queries/kanbanStatusColumnQueries";
import { GET_USER, GET_USERS } from "../../../../graphql/queries/userQueries";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { Checkbox } from "../../../../components/reusable/Checkbox/Checkbox";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";

// STATE
import { useSelector } from "react-redux";

export const EditKanbanTicket = () => {
  const { darkMode } = useSelector((state) => state.theme);

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
  const { userInfo } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(ticket?.userId);
  const [organizationId, setOrganizationId] = useState(ticket?.organizationId);

  const [updateTicket] = useMutation(UPDATE_TICKET, {
    variables: {
      id: ticketId,
      title,
      description,
      blocked,
      kanbanId,
      status,
      blockedReason,
      userId,
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

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: userInfo._id },
  });

  const { data: allUsers } = useQuery(GET_USERS, {
    variables: { id: organizationId },
  });

  const {
    loading: kanbanStatusColumnLoading,
    error: kanbanStatusColumnError,
    data: kanbanStatusColumnData,
  } = useQuery(GET_KANBAN_STATUS_COLUMNS, {
    variables: { kanbanId },
  });

  useEffect(() => {
    setOrganizationId(userData?.user?.organizationId);
  }, [userData?.user?.organizationId]);

  useEffect(() => {
    setStatus(kanbanStatusColumnData?.kanbanStatusColumns[0]?.id);
  }, [kanbanStatusColumnData]);

  if (ticketLoading || kanbanStatusColumnLoading) return <Spinner />;
  if (ticketError || kanbanStatusColumnError)
    return <p>Something went wrong</p>;

  const ticketStatusOptionsNew = kanbanStatusColumnData.kanbanStatusColumns;

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
      blockedReason,
      userId
    );
  };

  return (
    <div className="bg-slate-50 mt-2 mx-2 p-3 rounded-xl">
      <h1 className="text-lg text-left">Update Ticket</h1>
      <div className="">
        <label
          className={`block uppercase tracking-wide ${
            darkMode ? "text-slate-50" : "text-gray-700"
          }  text-xs font-bold mb-2 mt-3`}
        >
          Ticket Owner
        </label>
        <select
          className={`${
            darkMode ? "bg-sky-950 text-slate-50" : "bg-gray-200 text-gray-700"
          } form-select mb-4`}
          aria-label="Project Owner Select"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          {/* <option value="">Select Ticket Owner</option> */}
          {allUsers?.users?.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
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

            <DynamicInput
              id="ticket-status"
              inputType="select"
              label="Status"
              changeHandler={(e) => setStatus(e.target.value)}
              value={status}
              defaultValue={ticketStatusOptionsNew[0].id}
              selectOptions={ticketStatusOptionsNew}
              ariaLabel="Ticket status select"
              className="w-1/2 mr-3"
            />

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
