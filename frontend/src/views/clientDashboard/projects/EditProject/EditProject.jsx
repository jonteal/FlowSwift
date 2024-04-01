import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { UPDATE_PROJECT } from "../../../../graphql/mutations/projectMutations";
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DateSelector } from "../../../../components/reusable/DateSelector/DateSelector";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";

// STATE
import { useState } from "react";
import { useSelector } from "react-redux";

export const EditProject = () => {
  const { darkMode } = useSelector((state) => state.theme);

  const { projectId, organizationId } = useParams();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, { variables: { id: projectId } });

  const project = projectData?.project;

  const [title, setTitle] = useState(project?.title);
  const [description, setDescription] = useState(project?.description);
  const [status, setStatus] = useState(project?.status);
  const [notes, setNotes] = useState(project?.notes);
  const [startDate, setStartDate] = useState(new Date(project?.startDate));
  const [deadline, setDeadline] = useState(new Date(project?.deadline));
  const [clientBudget, setClientBudget] = useState(project?.clientBudget);
  const [projectEstimate, setProjectEstimate] = useState(
    project?.projectEstimate
  );

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: projectId,
      title,
      description,
      status,
      notes,
      startDate,
      deadline,
      clientBudget,
      projectEstimate,
      organizationId,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      return alert("Please fill out a project title and client budget");
    }

    updateProject(
      projectId,
      title,
      description,
      status,
      notes,
      startDate,
      deadline,
      clientBudget,
      projectEstimate,
      organizationId
    );
  };

  if (projectLoading) return <Spinner />;
  if (projectError)
    return <p>There was a problem loading the project information...</p>;
  return (
    <div
      className={`w-full mx-2 rounded-xl mt-3 py-3 border ${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      }  px-10`}
    >
      <form onSubmit={onSubmit}>
        <DynamicInput
          id="edit-project-title"
          inputType="input"
          type="text"
          label="Title"
          changeHandler={(e) => setTitle(e.target.value)}
          value={title}
          className="mb-3"
          ariaLabel="Edit project title"
        />

        <DynamicInput
          id="edit-project-description"
          inputType="textarea"
          label="Description"
          changeHandler={(e) => setDescription(e.target.value)}
          value={description}
          className="mb-3"
          ariaLabel="Edit Project description"
          rows="3"
        />

        <div className="flex flex-col md:flex-row w-full justify-around items-center">
          <DynamicInput
            id="edit-project-status"
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
            className="flex-col w-full"
            ariaLabel="Edit Project status"
          />

          <DateSelector
            className="w-full mb-3"
            label="Start Date"
            date={startDate}
            dateChangeHandler={handleStartDateChange}
          />

          <DateSelector
            className="w-full mb-3"
            label="Deadline"
            date={deadline}
            dateChangeHandler={handleDeadlineChange}
          />
        </div>

        <DynamicInput
          id="edit-project-notes"
          inputType="textarea"
          label="Notes"
          changeHandler={(e) => setNotes(e.target.value)}
          value={notes}
          className="mb-3 w-full"
          ariaLabel="Edit project notes"
        />

        <div className="flex flex-col md:flex-row w-full justify-around items-center">
          <DynamicInput
            id="edit-project-budget"
            inputType="input"
            type="number"
            label="Budget"
            changeHandler={(e) => setClientBudget(e.target.value)}
            value={clientBudget}
            className="mb-3 w-full"
            ariaLabel="Edit project budget"
          />

          <DynamicInput
            id="edit-project-estimate"
            inputType="input"
            type="number"
            label="Project Estimate"
            changeHandler={(e) => setProjectEstimate(e.target.value)}
            value={projectEstimate}
            className="mb-3 w-full"
            ariaLabel="Edit project estimate"
          />
        </div>

        <DynamicButton color="red" type="submit">
          Submit
        </DynamicButton>
      </form>
    </div>
  );
};
