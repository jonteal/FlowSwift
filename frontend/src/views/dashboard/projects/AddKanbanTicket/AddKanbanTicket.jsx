import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";
import { ADD_TICKET } from "../../../../graphql/mutations/ticketMutations";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { Checkbox } from "../../../../components/reusable/Checkbox/Checkbox";
import { GET_USER } from "../../../../graphql/queries/userQueries";
import { useSelector } from "react-redux";

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
  console.log("userId: ", userId);

  console.log("userInfo: ", userInfo);

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

  // console.log("userData: ", userData);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return alert("Please fill out all fields");
    }

    // setUserId(userData?.user?._id);

    // console.log("userId: ", userId);

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

  return (
    <div className="bg-slate-50 mt-2 mx-2 p-3 rounded-xl">
      <h1 className="text-lg text-left">New Ticket</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="name"
            type="text"
            placeholder="Name of the ticket"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-4">
            Ticket Type
          </label>
          <select
            id="type"
            className="form-select mb-4"
            value={typeOfTicket}
            onChange={(e) => setTypeOfTicket(e.target.value)}
          >
            <option value="userStory">User Story</option>
            <option value="defect">Defect</option>
          </select>
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
            <option value="pre">Ready</option>
            <option value="middle">In Progress</option>
            <option value="old">Done</option>
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

        <DynamicButton color="red" type="submit">
          Submit
        </DynamicButton>
      </form>
    </div>
  );
};
