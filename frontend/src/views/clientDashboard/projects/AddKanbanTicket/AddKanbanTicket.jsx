import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

// GRAPHQL
import { ADD_TICKET } from "../../../../graphql/mutations/ticketMutations";
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";
import { GET_USER } from "../../../../graphql/queries/userQueries";
import { GET_KANBAN_STATUS_COLUMNS } from "../../../../graphql/queries/kanbanStatusColumnQueries";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { Checkbox } from "../../../../components/reusable/Checkbox/Checkbox";

export const AddKanbanTicket = () => {
  const { kanbanId } = useParams();
  const [title, setTitle] = useState("");
  const [typeOfTicket, setTypeOfTicket] = useState("userStory");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [blockedReason, setBlockedReason] = useState("");
  const [ready, setIsReady] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(userInfo._id);

  const [addTicket] = useMutation(ADD_TICKET, {
    variables: {
      title,
      typeOfTicket,
      description,
      size,
      blocked,
      blockedReason,
      ready,
      kanbanId,
      status,
      userId,
    },
    update(cache, { data: { addTicket } }) {
      const { tickets } = cache.readQuery({
        query: GET_TICKETS,
        variables: { kanbanId },
      });
      cache.writeQuery({
        query: GET_TICKETS,
        variables: { kanbanId },
        data: { tickets: [...tickets, addTicket] },
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

  const {
    loading: kanbanStatusColumnLoading,
    error: kanbanStatusColumnError,
    data: kanbanStatusColumnData,
  } = useQuery(GET_KANBAN_STATUS_COLUMNS, {
    variables: { kanbanId },
  });

  useEffect(() => {
    setStatus(kanbanStatusColumnData?.kanbanStatusColumns[0]?.id);
  }, [kanbanStatusColumnData]);

  if (userLoading || kanbanStatusColumnLoading) return <Spinner />;
  if (userError || kanbanStatusColumnError) return <p>There was an error..</p>;

  const ticketStatusOptionsNew = kanbanStatusColumnData.kanbanStatusColumns;

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return alert("Please fill out all fields");
    }

    addTicket(
      title,
      typeOfTicket,
      description,
      size,
      status,
      blocked,
      blockedReason,
      ready,
      kanbanId,
      userId
    );

    setTitle("");
    setTypeOfTicket("userStory");
    setDescription("");
    setSize("");
    setStatus("");
    setBlocked(!blocked);
    setIsReady(false);
    setBlockedReason("");
  };

  const ticketTypeOptions = [
    { label: "User Story", value: "userStory" },
    { label: "Defect", value: "defect" },
  ];

  return (
    <DynamicContainer>
      <h1 className="text-lg text-left">New Ticket</h1>
      <form onSubmit={onSubmit}>
        <DynamicInput
          id="name"
          inputType="input"
          type="text"
          label="Title"
          changeHandler={(e) => setTitle(e.target.value)}
          placeholder="Name of the ticket"
          value={title}
          ariaLabel="Kanban ticket title"
        />

        <DynamicInput
          id="ticket-type"
          inputType="select"
          label="Ticket Type"
          changeHandler={(e) => setTypeOfTicket(e.target.value)}
          value={typeOfTicket}
          selectOptions={ticketTypeOptions}
          ariaLabel="Kanban ticket type select"
        />

        <DynamicInput
          id="ticket-description"
          inputType="textarea"
          rows="3"
          placeholder="Description about this ticket"
          changeHandler={(e) => setDescription(e.target.value)}
          value={description}
          ariaLabel="Ticket type Description"
        />

        <div className="flex flex-row items-start justify-around">
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

          <DynamicInput
            id="size"
            inputType="input"
            type="number"
            label="Size"
            changeHandler={(e) => setSize(e.target.value)}
            placeholder="Ticket Size"
            value={size}
            ariaLabel="Kanban ticket size"
            className="w-1/2 ml-3"
          />
        </div>

        <div className="flex mb-4 flex-col items-start w-full">
          <Checkbox
            label="Is this story blocked?"
            value={blocked}
            setChangeHandler={() => setBlocked(!blocked)}
          />

          {blocked && (
            <DynamicInput
              id="ticket-block-description"
              inputType="textarea"
              label="Description"
              changeHandler={(e) => setBlockedReason(e.target.value)}
              placeholder="Reason the story is blocked"
              value={blockedReason}
              rows="3"
              ariaLabel="Blocked reason section"
              className="w-full"
            />
          )}
        </div>

        <DynamicButton color="red" type="submit">
          Submit
        </DynamicButton>
      </form>
    </DynamicContainer>
  );
};
