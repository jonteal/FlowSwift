import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { UPDATE_PROJECT } from "../../../../graphql/mutations/projectMutations";
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DateSelector } from "../../../../components/reusable/DateSelector/DateSelector";

export const EditProject = () => {
  const { projectId } = useParams();

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
      projectEstimate
    );
  };

  if (projectLoading) return <Spinner />;
  if (projectError)
    return <p>There was a problem loading the project information...</p>;
  return (
    <div className="w-2/3 mx-auto mt-5">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <label className="form-label">Status</label>
        <select
          id="status"
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="notStarted">Not Started</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
          <option value="needsAttention">Needs Attention</option>
        </select>

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

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control"
            id="notes"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Budget</label>
          <input
            type="clientBudget"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="What is the budget for this project?"
            value={clientBudget}
            onChange={(e) => setClientBudget(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Project Estimate</label>
          <input
            type="projectEstimate"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="What is the estimate for this project?"
            value={projectEstimate}
            onChange={(e) => setProjectEstimate(e.target.value)}
          />
        </div>

        <DynamicButton color="red" type="submit">
          Submit
        </DynamicButton>
      </form>
    </div>
  );
};
