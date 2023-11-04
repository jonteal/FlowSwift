import { useState } from "react";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";

// COMPONENTS
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../components/reusable/DynamicButton/DynamicButton";
import { ProjectPageCard } from "../../components/ProjectPageCard/ProjectPageCard";
import { Switch } from "../../components/reusable/Switch/Switch";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";
import { ProjectsTableItem } from "../../components/ProjectsTableItem/ProjectsTableItem";

export const Projects = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGridView, setGridView] = useState(true);

  const handleViewChange = () => {
    setGridView(!isGridView);
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the comment feed</p>;

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
        <DynamicButton
          color="red"
          type="link"
          link="/addProject"
          className="mx-2 mt-4"
        >
          Add Project
        </DynamicButton>
        <Switch isChecked={isGridView} changeHandler={handleViewChange} />
      </div>

      <p
        className={`block uppercase tracking-wide ${
          darkMode ? "text-sky-100" : "text-slate-700"
        }  text-base font-bold mb-2`}
      >
        Total Projects: {data.projects.length}
      </p>

      {isGridView ? (
        <div className="flex flex-row flex-wrap mx-auto">
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
        <div className="flex flex-wrap px-20 flex-col w-full">
          <table className="table-auto">
            <thead>
              <tr>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  }  font-light w-auto text-left pl-2 border`}
                >
                  #
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  }  font-light w-2/12 text-left pl-2 border`}
                >
                  Project Name
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  }  font-light w-2/12 text-left pl-2 border`}
                >
                  Client
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  }  font-light w-2/12 text-left pl-2 border`}
                >
                  Status
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  }  font-light w-2/12 text-left pl-2 border`}
                >
                  Start Date
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  }  font-light w-3/12 text-left pl-2 border`}
                >
                  Deadline
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  }  font-light w-2/12 text-left pl-2 border`}
                >
                  Client Budget
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  }  font-light w-2/12 text-left pl-2 border`}
                >
                  Project Estimate
                </th>
                <th
                  className={`${
                    darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                  }  font-light w-2/12 text-left pl-2 border`}
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
