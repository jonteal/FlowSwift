// REACT
import { useEffect, useState } from "react";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_PROJECT } from "../../../../graphql/mutations/projectMutations";
import { GET_CLIENT_PROJECTS } from "../../../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../../../graphql/queries/clientQueries";
import { GET_USER, GET_USERS } from "../../../../graphql/queries/userQueries";

// COMPONENTS
import { DateSelector } from "../../../../components/reusable/DateSelector/DateSelector";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";

// STATE
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const AddProject = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const { organizationId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("notStarted");
  const [priority, setPriority] = useState("medium");
  const [clientId, setClientId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [clientBudget, setClientBudget] = useState("");
  const [projectEstimate, setProjectEstimate] = useState("");
  const [alertOn, setAlertOn] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(userInfo._id);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      title,
      description,
      clientId,
      status,
      priority,
      startDate,
      deadline,
      notes,
      clientBudget,
      projectEstimate,
      userId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_CLIENT_PROJECTS,
        variables: { clientId },
      });
      cache.writeQuery({
        query: GET_CLIENT_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS, {
    variables: { organizationId },
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      title === "" ||
      description === "" ||
      status === "" ||
      clientBudget === ""
    ) {
      setAlertOn(true);
      return (
        <div className="alert alert-danger" role="alert">
          Please provide a title, description, status, budget, and estimate!
        </div>
      );
    }

    addProject(
      title,
      description,
      clientId,
      status,
      priority,
      startDate,
      deadline,
      notes,
      clientBudget,
      projectEstimate,
      userId
    );

    setTitle("");
    setDescription("");
    setStatus("notStarted");
    setPriority("medium");
    setClientId("");
    setStartDate(new Date());
    setDeadline(new Date());
    setNotes("");
    setClientBudget("");
    setProjectEstimate("");
    setUserId("");
  };

  const { data: userData } = useQuery(GET_USER, {
    variables: { id: userInfo._id },
  });

  const { data: allUsers } = useQuery(GET_USERS, {
    variables: { organizationId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the content</p>;

  return (
    <DynamicContainer className="w-full">
      {!loading && !error && (
        <div className="w-full mx-auto">
          {alertOn && (
            <div className="alert alert-danger mt-3" role="alert">
              Please provide a title, description, and status!
            </div>
          )}

          <label
            className={`block uppercase tracking-wide ${
              darkMode ? "text-slate-50" : "text-gray-700"
            }  text-xs font-bold mb-2 mt-3`}
          >
            Client Name
          </label>
          <select
            className={`${
              darkMode
                ? "bg-sky-950 text-slate-50"
                : "bg-gray-200 text-gray-700"
            } form-select mb-4`}
            aria-label="Default select example"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="">Select Client</option>
            {data.clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.firstName + " " + client.lastName}
              </option>
            ))}
          </select>

          <label
            className={`block uppercase tracking-wide ${
              darkMode ? "text-slate-50" : "text-gray-700"
            }  text-xs font-bold mb-2 mt-3`}
          >
            Project Owner (Optional)
          </label>
          <select
            className={`${
              darkMode
                ? "bg-sky-950 text-slate-50"
                : "bg-gray-200 text-gray-700"
            } form-select mb-4`}
            aria-label="Project Owner Select"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select Employee</option>
            {allUsers?.users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <form className="mt-4 mb-10" onSubmit={onSubmit}>
            <DynamicInput
              id="project-title"
              inputType="input"
              type="text"
              label="Title"
              changeHandler={(e) => setTitle(e.target.value)}
              placeholder="Name of your project..."
              value={title}
              ariaLabel="Project title"
              className="mb-3"
            />

            <DynamicInput
              id="project-title"
              inputType="textarea"
              rows="3"
              label="Description"
              changeHandler={(e) => setDescription(e.target.value)}
              placeholder="Description of your project..."
              value={description}
              ariaLabel="Project Description"
              className="mb-3"
            />

            <DynamicInput
              id="project-status"
              inputType="select"
              label="Status"
              changeHandler={(e) => setStatus(e.target.value)}
              value={status}
              selectOptions={[
                { value: "notStarted", label: "Not Started" },
                { value: "inProgress", label: "In Progress" },
                { value: "completed", label: "Completed" },
                { value: "paused", label: "Paused" },
                { value: "needsAttention", label: "Needs Attention" },
              ]}
              ariaLabel="Project status select"
            />

            <DynamicInput
              id="project-status"
              inputType="select"
              label="Priority"
              changeHandler={(e) => setPriority(e.target.value)}
              value={priority}
              selectOptions={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
              ariaLabel="Project priority select"
            />

            <DateSelector
              className="mb-3"
              label="Start Date"
              date={startDate}
              dateChangeHandler={handleStartDateChange}
            />

            <DateSelector
              className="mb-3"
              label="Deadline"
              date={deadline}
              dateChangeHandler={handleDeadlineChange}
            />

            <DynamicInput
              id="project-notes"
              inputType="textarea"
              label="Notes"
              changeHandler={(e) => setNotes(e.target.value)}
              placeholder="Notes for your project..."
              value={notes}
              className="mb-3"
              row="3"
              ariaLabel="Project notes"
            />

            <DynamicInput
              id="project-budget"
              inputType="input"
              type="number"
              label="Budget"
              changeHandler={(e) => setClientBudget(e.target.value)}
              placeholder="ex. 5000"
              value={clientBudget}
              className="mb-3"
              ariaLabel="Project budget"
            />

            <DynamicInput
              id="project-estimate"
              inputType="input"
              type="text"
              label="Project Estimate"
              changeHandler={(e) => setProjectEstimate(e.target.value)}
              placeholder="ex. 4500"
              value={projectEstimate}
              className="mb-3"
              ariaLabel="Project Estimate"
            />

            <DynamicButton color="red" type="submit">
              Submit
            </DynamicButton>
          </form>
        </div>
      )}
    </DynamicContainer>
  );
};
