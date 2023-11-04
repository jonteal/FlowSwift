import { useContext, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context";
import { camelCaseToWords } from "../../utils/format";

export const ProjectsTableItem = ({ project, index }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

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
        }  font-light text-left border pl-2 pr-2`}
      >
        {index + 1}
      </td>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        }  font-light text-left border pl-2`}
      >
        {project.title}
      </td>
      <td
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        }  font-light text-left border pl-2`}
      >
        {project.client.firstName}
      </td>
      <td
        className={`font-base text-slate-50 text-left border pl-2 ${statusColor}`}
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
        }  font-light text-left border pl-2`}
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
        {/* <button>
        <FaRegTrashAlt className="text-red-500" />
      </button> */}
      </td>
    </tr>
  );
};
