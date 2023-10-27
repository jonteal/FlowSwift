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

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../../context";

export const EditProject = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
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
    <div
      className={`w-full mx-2 rounded-xl mt-3 py-3 border ${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      }  px-10`}
    >
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label
            className={`block uppercase tracking-wide ${
              darkMode ? "text-slate-50" : "text-gray-700"
            }  text-xs font-bold my-4 mb-2`}
          >
            Title
          </label>
          <input
            type="text"
            className={`appearance-none block w-full ${
              darkMode
                ? "bg-sky-950 text-slate-50 border-gray-200 focus:bg-sky-950"
                : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white"
            }  border  rounded py-2 px-3 mb-3 leading-tight focus:outline-none `}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            className={`block uppercase tracking-wide ${
              darkMode ? "text-slate-50" : "text-gray-700"
            }  text-xs font-bold my-4 mb-2`}
          >
            Description
          </label>
          <textarea
            className={`appearance-none block w-full ${
              darkMode
                ? "bg-sky-950 text-slate-50 border-gray-200 focus:bg-sky-950 focus:border-gray-500"
                : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white focus:border-gray-500"
            } border rounded py-3 px-4 leading-tight focus:outline-none `}
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-row w-full justify-around items-center">
          <div className="flex-col">
            <label
              className={`block uppercase tracking-wide ${
                darkMode ? "text-slate-50" : "text-gray-700"
              }  text-xs font-bold my-4 mb-2`}
            >
              Status
            </label>
            <select
              id="status"
              className={`${
                darkMode
                  ? "bg-sky-950 text-slate-50"
                  : "bg-gray-200 text-gray-700"
              } form-select mb-4`}
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
            className=""
            label="Start Date"
            date={startDate}
            dateChangeHandler={handleStartDateChange}
          />

          <DateSelector
            className=""
            label="Deadline"
            date={deadline}
            dateChangeHandler={handleDeadlineChange}
          />
        </div>

        <div className="mb-3">
          <label
            className={`block uppercase tracking-wide ${
              darkMode ? "text-slate-50" : "text-gray-700"
            }  text-xs font-bold my-4 mb-2`}
          >
            Notes
          </label>
          <textarea
            className={`appearance-none block w-full ${
              darkMode
                ? "bg-sky-950 text-slate-50 border-gray-200 focus:bg-sky-950 focus:border-gray-500"
                : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white focus:border-gray-500"
            } border rounded py-3 px-4 leading-tight focus:outline-none `}
            id="notes"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-row w-full justify-around items-center">
          <div className="mb-3">
            <label
              className={`block uppercase tracking-wide ${
                darkMode ? "text-slate-50" : "text-gray-700"
              }  text-xs font-bold my-4 mb-2`}
            >
              Budget
            </label>
            <input
              type="clientBudget"
              className={`appearance-none block w-full ${
                darkMode
                  ? "bg-sky-950 text-slate-50 border-gray-200 focus:bg-sky-950"
                  : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white"
              }  border  rounded py-2 px-3 mb-3 leading-tight focus:outline-none `}
              id="exampleFormControlInput1"
              placeholder="What is the budget for this project?"
              value={clientBudget}
              onChange={(e) => setClientBudget(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label
              className={`block uppercase tracking-wide ${
                darkMode ? "text-slate-50" : "text-gray-700"
              }  text-xs font-bold my-4 mb-2`}
            >
              Project Estimate
            </label>
            <input
              type="projectEstimate"
              className={`appearance-none block w-full ${
                darkMode
                  ? "bg-sky-950 text-slate-50 border-gray-200 focus:bg-sky-950"
                  : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white"
              }  border rounded py-2 px-3 mb-3 leading-tight focus:outline-none `}
              id="exampleFormControlInput1"
              placeholder="What is the estimate for this project?"
              value={projectEstimate}
              onChange={(e) => setProjectEstimate(e.target.value)}
            />
          </div>
        </div>

        <DynamicButton color="red" type="submit">
          Submit
        </DynamicButton>
      </form>
    </div>
  );
};
