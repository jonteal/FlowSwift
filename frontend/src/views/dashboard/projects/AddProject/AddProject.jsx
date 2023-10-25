// REACT
import { useEffect, useState } from "react";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_PROJECT } from "../../../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../../../graphql/queries/clientQueries";

// COMPONENTS
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DateSelector } from "../../../../components/reusable/DateSelector/DateSelector";
import { useSelector } from "react-redux";
import { GET_USER } from "../../../../graphql/queries/userQueries";

export const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("notStarted");
  const [clientId, setClientId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [clientBudget, setClientBudget] = useState("");
  const [projectEstimate, setProjectEstimate] = useState("");
  const [alertOn, setAlertOn] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [organizationId, setOrganizationId] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      title,
      description,
      clientId,
      status,
      startDate,
      deadline,
      notes,
      clientBudget,
      projectEstimate,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
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
          Please provide a title, description, and status!
        </div>
      );
    }

    addProject(
      title,
      description,
      clientId,
      status,
      startDate,
      deadline,
      notes,
      clientBudget,
      projectEstimate
    );

    setTitle("");
    setDescription("");
    setStatus("notStarted");
    setClientId("");
    setStartDate(new Date());
    setDeadline(new Date());
    setNotes("");
    setClientBudget("");
    setProjectEstimate("");
  };

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: userInfo._id },
  });

  useEffect(() => {
    setOrganizationId(userData?.user?.organizationId);
  }, [userData?.user?.organizationId]);

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the content</p>;

  return (
    <div>
      {!loading && !error && (
        <div className="w-3/5 mx-auto">
          {alertOn && (
            <div className="alert alert-danger mt-3" role="alert">
              Please provide a title, description, and status!
            </div>
          )}

          <label className="form-label mt-8">Client Name</label>
          <select
            className="form-select"
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
          <form className="mt-4 mb-10" onSubmit={onSubmit}>
            <div className="mb-3">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="title"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Name of your project..."
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
            </div>

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
      )}
    </div>
  );
};
