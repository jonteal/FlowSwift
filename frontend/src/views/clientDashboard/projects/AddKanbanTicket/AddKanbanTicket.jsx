import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

// GRAPHQL
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";
import { ADD_TICKET } from "../../../../graphql/mutations/ticketMutations";
import { GET_USER } from "../../../../graphql/queries/userQueries";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { Checkbox } from "../../../../components/reusable/Checkbox/Checkbox";

export const AddKanbanTicket = () => {
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [typeOfTicket, setTypeOfTicket] = useState("userStory");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pre");
  const [blocked, setBlocked] = useState(false);
  const [blockedReason, setBlockedReason] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(userInfo._id);

  const [addTicket] = useMutation(ADD_TICKET, {
    variables: {
      title,
      typeOfTicket,
      description,
      blocked,
      projectId,
      status,
      blockedReason,
      userId,
    },
    update(cache, { data: { addTicket } }) {
      const { tickets } = cache.readQuery({
        query: GET_TICKETS,
        variables: { projectId },
      });
      cache.writeQuery({
        query: GET_TICKETS,
        variables: { projectId },
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

  if (userLoading) return <Spinner />;
  if (userError) return <p>There was an error..</p>;

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return alert("Please fill out all fields");
    }

    addTicket(
      title,
      typeOfTicket,
      description,
      projectId,
      status,
      blocked,
      blockedReason,
      userId
    );

    setTitle("");
    setTypeOfTicket("userStory");
    setDescription("");
    setStatus("pre");
    setBlocked(!blocked);
    setBlockedReason("");
  };

  const ticketTypeOptions = [
    { label: "User Story", value: "userStory" },
    { label: "Defect", value: "defect" },
  ];

  const ticketStatusOptions = [
    {
      label: "Ready",
      value: "ready",
    },
    {
      label: "In Progress",
      value: "inProgress",
    },
    {
      label: "Done",
      value: "done",
    },
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

        <DynamicInput
          id="ticket-status"
          inputType="select"
          label="Status"
          changeHandler={(e) => setStatus(e.target.value)}
          value={status}
          selectOptions={ticketStatusOptions}
          ariaLabel="Ticket status select"
        />

        <div className="flex mb-4 flex-col items-start w-full">
          <Checkbox
            label="Is this story blocked?"
            value={blocked}
            setChangeHandler={() => setBlocked(!blocked)}
          />

          {blocked && (
            <div className="w-full">
              <DynamicInput
                id="ticket-block-description"
                inputType="textarea"
                label="Description"
                changeHandler={(e) => setBlockedReason(e.target.value)}
                placeholder="Reason the story is blocked"
                value={blockedReason}
                rows="3"
                ariaLabel="Blocked reason section"
              />
            </div>
          )}
        </div>

        <DynamicButton color="red" type="submit">
          Submit
        </DynamicButton>
      </form>
    </DynamicContainer>
  );
};
