import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ICONS
import { FaRegEye } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

// COMPONENTS
import { DeleteProject } from "../../views/Projects/DeleteProject";

// STATE
import { useSelector } from "react-redux";

// UTILS
import { camelCaseToWords } from "../../utils/format";

export const ProjectsTableItem = ({ project, index }) => {
  const { darkMode } = useSelector((state) => state.theme);

  const { projectName } = useSelector((state) => state.projects);

  const [statusColor, setStatusColor] = useState("");

  const status = project.status;

  useEffect(() => {
    if (status === "notStarted") {
      setStatusColor("bg-yellow-500");
    } else if (status === "inProgress") {
      setStatusColor("bg-green-600");
    } else if (status === "completed") {
      setStatusColor("bg-sky-600");
    } else if (status === "paused") {
      setStatusColor("bg-red-600");
    } else if (status === "needsAttention") {
      setStatusColor("bg-orange-500");
    }
  }, [status]);

  return (
    <tr key={project.id}>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        } font-light text-left border pl-2 pr-2`}
      >
        {index + 1}
      </td>
      {projectName && (
        <td
          className={`${
            darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
          } font-light text-left border pl-2`}
        >
          {project.title}
        </td>
      )}
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        } font-light text-left border pl-2`}
      >
        {project.client.firstName}
      </td>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        } ${statusColor} font-light text-left border pl-2`}
      >
        {camelCaseToWords(project.status)}
      </td>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        }  font-light text-left border pl-2`}
      >
        {project.startDate}
      </td>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        }  font-light text-left border pl-2`}
      >
        {project.deadline}
      </td>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        } font-light text-left border pl-2`}
      >
        {project.clientBudget}
      </td>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        }  font-light text-left border pl-2`}
      >
        {project.projectEstimate}
      </td>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        }  font-light text-left border pl-2`}
      >
        <Link
          to={`/clients/${project.client.id}/projects/${project.id}/profile`}
        >
          <FaRegEye
            className={`${darkMode ? "text-sky-200" : "text-sky-600"} mr-2`}
          />
        </Link>
      </td>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        }  font-light text-left border pl-2`}
      >
        <DeleteProject subject="Project" projectId={project.id}>
          <FaRegTrashAlt className="text-red-500 self-center mx-1" />
        </DeleteProject>
      </td>
    </tr>
  );
};
