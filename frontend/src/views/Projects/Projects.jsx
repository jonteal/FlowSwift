import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";

// COMPONENTS
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { Switch } from "../../components/reusable/Switch/Switch";
import { ProjectPageCard } from "../../components/ProjectPageCard/ProjectPageCard";
import { ProjectsTableItem } from "../../components/ProjectsTableItem/ProjectsTableItem";
import { FiltersList } from "../../components/reusable/FiltersList/FiltersList";

// STATE
import { ThemeContext } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import {
  setGridViewOn,
  setGridViewOff,
  setStatusBadgeOff,
  setStatusBadgeOn,
  setClientNameOff,
  setClientNameOn,
} from "../../slices/projectsSlice";

export const Projects = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const dispatch = useDispatch();

  const { gridView, statusBadge, clientName } = useSelector(
    (state) => state.projects
  );

  const handleGridViewToggle = () => {
    gridView ? dispatch(setGridViewOff()) : dispatch(setGridViewOn());
  };

  const handleStatusBadgeToggle = () => {
    statusBadge ? dispatch(setStatusBadgeOff()) : dispatch(setStatusBadgeOn());
  };

  const handleClientNameToggle = () => {
    clientName ? dispatch(setClientNameOff()) : dispatch(setClientNameOn());
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
      name: "Client Name",
      toggle: handleClientNameToggle,
      value: clientName,
      isChecked: clientName,
      ariaLabel: "Client Name filter",
    },
  ];

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode ? "bg-sky-800" : "bg-slate-50"
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
          className="border bg-sky-500 px-4 py-2 rounded-lg"
          onClick={handleOpenFilters}
        >
          Filters
        </button>

        <Switch isChecked={gridView} changeHandler={handleGridViewToggle} />
      </div>
      {isFilterOptionsOpen && <FiltersList filters={projectCardFilters} />}

      <p
        className={`block uppercase tracking-wide ${
          darkMode ? "text-sky-100" : "text-slate-700"
        }  text-base font-bold mb-2`}
      >
        Total Projects: {data.projects.length}
      </p>

      {gridView ? (
        <div className="flex md:flex-row flex-wrap mx-auto flex-col">
          {data.projects
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
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-3/12 md:w-2/12 text-left pl-2 border`}
                >
                  Project Name
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-3/12 md:w-2/12 text-left pl-2 border`}
                >
                  Client
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-2/12 text-left pl-2 border`}
                >
                  Status
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-2/12 text-left pl-2 border`}
                >
                  Start Date
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-3/12 text-left pl-2 border`}
                >
                  Deadline
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-2/12 text-left pl-2 border`}
                >
                  Client Budget
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  } w-2/12 text-left pl-2 border`}
                >
                  Project Estimate
                </th>
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
              {data.projects
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
