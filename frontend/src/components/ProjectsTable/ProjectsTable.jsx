import { ProjectsTableItem } from "../ProjectsTableItem/ProjectsTableItem";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";

export const ProjectsTable = ({ projects, searchTerm }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="border w-full mx-10 flex flex-col">
      <table className="table-auto overflow-x-scroll">
        <thead>
          <tr>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } w-auto text-left pl-2 border font-semibold`}
            >
              #
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Project Name
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Client
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Status
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Start Date
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Deadline
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Budget
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            >
              Estimate
            </th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            ></th>
            <th
              className={`${
                darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
              } font-semibold w-2/12 text-left pl-2 border`}
            ></th>
          </tr>
        </thead>
        <tbody>
          {projects
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
  );
};
