import { useState } from "react";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_ORGANIZATION_PROJECTS } from "../../graphql/queries/projectQueries";

// COMPONENTS
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { Switch } from "../../components/reusable/Switch/Switch";
import { ProjectPageCard } from "../../components/ProjectPageCard/ProjectPageCard";
import { ProjectsTableItem } from "../../components/ProjectsTableItem/ProjectsTableItem";
import { FiltersList } from "../../components/reusable/FiltersList/FiltersList";

// STATE
import { useDispatch, useSelector } from "react-redux";
import {
  setGridViewOn,
  setGridViewOff,
  setStatusBadgeOff,
  setStatusBadgeOn,
  setClientNameOff,
  setClientNameOn,
  setDescriptionOff,
  setDescriptionOn,
  setBudgetOn,
  setBudgetOff,
  setDatesOff,
  setDatesOn,
  setEstimateOff,
  setEstimateOn,
  setProjectOwnerOff,
  setProjectOwnerOn,
  setPriorityBadgeOff,
  setPriorityBadgeOn,
  setProjectNameOff,
  setProjectNameOn,
  setProjectClientOff,
  setProjectClientOn,
  setProjectStatusOff,
  setProjectStatusOn,
  setProjectStartDateOff,
  setProjectStartDateOn,
  setProjectDeadlineOff,
  setProjectDeadlineOn,
  setProjectPriorityOff,
  setProjectPriorityOn,
  setProjectBudgetOff,
  setProjectBudgetOn,
  setProjectEstimateOff,
  setProjectEstimateOn,
  setProjectOwnerTableOff,
  setProjectOwnerTableOn,
} from "../../slices/projectsSlice";
import { useParams } from "react-router-dom";

export const Projects = () => {
  const { organizationId } = useParams();
  const { darkMode } = useSelector((state) => state.theme);

  const { loading, error, data } = useQuery(GET_ORGANIZATION_PROJECTS, {
    variables: { organizationId },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    gridView,
    statusBadge,
    clientName,
    description,
    budget,
    estimate,
    dates,
    projectOwner,
    priorityBadge,
    projectName,
    projectClient,
    projectStatus,
    projectStartDate,
    projectDeadline,
    projectPriority,
    projectBudget,
    projectEstimate,
    projectOwnerTable,
  } = useSelector((state) => state.projects);

  const handleGridViewToggle = () => {
    gridView ? dispatch(setGridViewOff()) : dispatch(setGridViewOn());
  };

  const handleStatusBadgeToggle = () => {
    statusBadge ? dispatch(setStatusBadgeOff()) : dispatch(setStatusBadgeOn());
  };

  const handlePriorityBadgeToggle = () => {
    priorityBadge
      ? dispatch(setPriorityBadgeOff())
      : dispatch(setPriorityBadgeOn());
  };

  const handleClientNameToggle = () => {
    clientName ? dispatch(setClientNameOff()) : dispatch(setClientNameOn());
  };

  const handleDescriptionToggle = () => {
    description ? dispatch(setDescriptionOff()) : dispatch(setDescriptionOn());
  };

  const handleBudgetToggle = () => {
    budget ? dispatch(setBudgetOff()) : dispatch(setBudgetOn());
  };

  const handleEstimateToggle = () => {
    estimate ? dispatch(setEstimateOff()) : dispatch(setEstimateOn());
  };

  const handleDatesToggle = () => {
    dates ? dispatch(setDatesOff()) : dispatch(setDatesOn());
  };

  const handleProjectOwnerToggle = () => {
    projectOwner
      ? dispatch(setProjectOwnerOff())
      : dispatch(setProjectOwnerOn());
  };

  // TABLE FILTERS
  const handleProjectNameToggle = () => {
    projectName ? dispatch(setProjectNameOff()) : dispatch(setProjectNameOn());
  };

  const handleProjectClientToggle = () => {
    projectClient
      ? dispatch(setProjectClientOff())
      : dispatch(setProjectClientOn());
  };

  const handleProjectStatusToggle = () => {
    projectStatus
      ? dispatch(setProjectStatusOff())
      : dispatch(setProjectStatusOn());
  };

  const handleProjectStartDateToggle = () => {
    projectStartDate
      ? dispatch(setProjectStartDateOff())
      : dispatch(setProjectStartDateOn());
  };

  const handleProjectDeadlineToggle = () => {
    projectDeadline
      ? dispatch(setProjectDeadlineOff())
      : dispatch(setProjectDeadlineOn());
  };

  const handleProjectPriorityToggle = () => {
    projectPriority
      ? dispatch(setProjectPriorityOff())
      : dispatch(setProjectPriorityOn());
  };

  const handleProjectBudgetToggle = () => {
    projectBudget
      ? dispatch(setProjectBudgetOff())
      : dispatch(setProjectBudgetOn());
  };

  const handleProjectEstimateToggle = () => {
    projectEstimate
      ? dispatch(setProjectEstimateOff())
      : dispatch(setProjectEstimateOn());
  };

  const handleProjectOwnerTableToggle = () => {
    projectOwnerTable
      ? dispatch(setProjectOwnerTableOff())
      : dispatch(setProjectOwnerTableOn());
  };

  const handleOpenFilters = () => {
    setIsFilterOptionsOpen(!isFilterOptionsOpen);
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the comment feed</p>;

  const projectCardFilters = [
    {
      name: "Status Badge",
      toggle: handleStatusBadgeToggle,
      value: statusBadge,
      isChecked: statusBadge,
      ariaLabel: "Status Badge filter",
    },
    {
      name: "Priority Badge",
      toggle: handlePriorityBadgeToggle,
      value: priorityBadge,
      isChecked: priorityBadge,
      ariaLabel: "Priority Badge filter",
    },
    {
      name: "Client Name",
      toggle: handleClientNameToggle,
      value: clientName,
      isChecked: clientName,
      ariaLabel: "Client Name filter",
    },
    {
      name: "Description",
      toggle: handleDescriptionToggle,
      value: description,
      isChecked: description,
      ariaLabel: "Project Description filter",
    },
    {
      name: "Budget",
      toggle: handleBudgetToggle,
      value: budget,
      isChecked: budget,
      ariaLabel: "Project Budget filter",
    },
    {
      name: "Dates",
      toggle: handleDatesToggle,
      value: dates,
      isChecked: dates,
      ariaLabel: "Project Dates filter",
    },
    {
      name: "Project Estimate",
      toggle: handleEstimateToggle,
      value: estimate,
      isChecked: estimate,
      ariaLabel: "Project Estimate filter",
    },
    {
      name: "Project Owner",
      toggle: handleProjectOwnerToggle,
      value: projectOwner,
      isChecked: projectOwner,
      ariaLabel: "Project Owner filter",
    },
  ];

  const projectTableFilters = [
    {
      name: "Project Name",
      toggle: handleProjectNameToggle,
      value: projectName,
      isChecked: projectName,
      ariaLabel: "Project Name filter",
    },
    {
      name: "Project Client",
      toggle: handleProjectClientToggle,
      value: projectClient,
      isChecked: projectClient,
      ariaLabel: "Project Client filter",
    },
    {
      name: "Project Status",
      toggle: handleProjectStatusToggle,
      value: projectStatus,
      isChecked: projectStatus,
      ariaLabel: "Project Status filter",
    },
    {
      name: "Project Start Date",
      toggle: handleProjectStartDateToggle,
      value: projectStartDate,
      isChecked: projectStartDate,
      ariaLabel: "Project Start Date filter",
    },
    {
      name: "Project Deadline",
      toggle: handleProjectDeadlineToggle,
      value: projectDeadline,
      isChecked: projectDeadline,
      ariaLabel: "Project Deadline filter",
    },
    {
      name: "Project Priority",
      toggle: handleProjectPriorityToggle,
      value: projectPriority,
      isChecked: projectPriority,
      ariaLabel: "Project Priority filter",
    },
    {
      name: "Project Budget",
      toggle: handleProjectBudgetToggle,
      value: projectBudget,
      isChecked: projectBudget,
      ariaLabel: "Project Budget filter",
    },
    {
      name: "Project Estimate",
      toggle: handleProjectEstimateToggle,
      value: projectEstimate,
      isChecked: projectEstimate,
      ariaLabel: "Project Estimate filter",
    },
    {
      name: "Project Owner",
      toggle: handleProjectOwnerTableToggle,
      value: projectOwnerTable,
      isChecked: projectOwnerTable,
      ariaLabel: "Project Owner filter",
    },
  ];

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode ? "bg-sky-950" : "bg-slate-50"
      }`}
    >
      <div className="flex flex-row justify-around mb-10">
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => setSearchTerm(event.target.value)}
          className="searchBar w-40 border rounded-xl pl-2 ml-5 mt-3 text-slate-700"
        />

        <button
          className="border bg-sky-500 text-slate-50 px-2 py-1 mb-4 w-1/12 rounded-lg mt-3 mr-2"
          onClick={handleOpenFilters}
        >
          {`${gridView ? "Grid" : "Table"} Filters`}
        </button>

        <Switch isChecked={gridView} changeHandler={handleGridViewToggle} />
      </div>
      {isFilterOptionsOpen && (
        <FiltersList
          filters={gridView ? projectCardFilters : projectTableFilters}
        />
      )}

      <p
        className={`block uppercase tracking-wide ${
          darkMode ? "text-sky-100" : "text-slate-700"
        } text-base font-bold mb-2`}
      >
        Total Projects: {data.organizationProjects.length}
      </p>

      {gridView ? (
        <div className="flex md:flex-row flex-wrap mx-auto flex-col">
          {data.organizationProjects
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val?.client.firstName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val?.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val?.client.lastName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((project) => (
              <ProjectPageCard key={project.id} project={project} />
            ))}
        </div>
      ) : (
        <div className="flex justify-center items-center px-20 flex-col w-full">
          <table className="table-auto w-full mx-2">
            <thead className="w-full">
              <tr className="w-full">
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-1/12 md:w-auto text-left pl-2 border`}
                >
                  #
                </th>
                {projectName && (
                  <th
                    className={`${
                      darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                    } w-3/12 md:w-2/12 text-left pl-2 border`}
                  >
                    Project Name
                  </th>
                )}
                {projectClient && (
                  <th
                    className={`${
                      darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                    } w-3/12 md:w-2/12 text-left pl-2 border`}
                  >
                    Client
                  </th>
                )}
                {projectOwnerTable && (
                  <th
                    className={`${
                      darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                    } w-3/12 md:w-2/12 text-left pl-2 border`}
                  >
                    Owner
                  </th>
                )}
                {projectStatus && (
                  <th
                    className={`${
                      darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                    } w-2/12 text-left pl-2 border`}
                  >
                    Status
                  </th>
                )}
                {projectStartDate && (
                  <th
                    className={`${
                      darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                    } w-2/12 text-left pl-2 border`}
                  >
                    Start Date
                  </th>
                )}
                {projectDeadline && (
                  <th
                    className={`${
                      darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                    } w-3/12 text-left pl-2 border`}
                  >
                    Deadline
                  </th>
                )}
                {projectPriority && (
                  <th
                    className={`${
                      darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                    } w-3/12 text-left pl-2 border`}
                  >
                    Priority
                  </th>
                )}
                {projectBudget && (
                  <th
                    className={`${
                      darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                    } w-2/12 text-left pl-2 border`}
                  >
                    Client Budget
                  </th>
                )}
                {projectEstimate && (
                  <th
                    className={`${
                      darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                    } w-2/12 text-left pl-2 border`}
                  >
                    Project Estimate
                  </th>
                )}
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-2/12 text-left pl-2 border`}
                ></th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-2/12 text-left pl-2 border`}
                ></th>
              </tr>
            </thead>
            <tbody>
              {data.organizationProjects
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val?.client.firstName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val?.title.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val?.client.lastName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((project, index) => (
                  <ProjectsTableItem
                    index={index}
                    key={project.id}
                    project={project}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
